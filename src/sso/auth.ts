import createError from 'http-errors';
import { decode, encode } from 'base64-arraybuffer';
import { hexDump, getMessageType } from './misc';
import { sspi, AcceptSecurityContextInput } from '../../lib/api';
import { SSO } from './SSO';
import { ServerContextHandleManager } from './ServerContextHandleManager';
import dbg from 'debug';
import { AuthOptions, Middleware, NextFunction } from './interfaces';
import { IncomingMessage, ServerResponse } from 'http';

const debug = dbg('node-expose-sspi:auth');

/**
 * Tries to get SSO information from browser. If success, the SSO info
 * is stored under req.sso
 *
 * @export
 * @param {AuthOptions} [options={}]
 * @returns {RequestHandler}
 */
export function auth(options: AuthOptions = {}): Middleware {
  const opts: AuthOptions = {
    useActiveDirectory: true,
    useGroups: true,
    useOwner: false,
    useCookies: true,
    groupFilterRegex: '.*',
    allowsGuest: false,
    allowsAnonymousLogon: false,
  };
  Object.assign(opts, options);

  let { credential, tsExpiry } = sspi.AcquireCredentialsHandle({
    packageName: 'Negotiate',
  });

  const checkCredentials = (): void => {
    if (tsExpiry < new Date()) {
      // renew server credentials
      sspi.FreeCredentialsHandle(credential);
      const renewed = sspi.AcquireCredentialsHandle({
        packageName: 'Negotiate',
      });
      credential = renewed.credential;
      tsExpiry = renewed.tsExpiry;
    }
  };

  const schManager = new ServerContextHandleManager(10000);

  // returns the node middleware.
  return (
    req: IncomingMessage,
    res: ServerResponse,
    next: NextFunction
  ): void => {
    (async (): Promise<void> => {
      try {
        const authorization = req.headers.authorization;
        if (!authorization) {
          debug('no authorization key in header');
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Negotiate');
          return res.end();
        }

        if (!authorization.startsWith('Negotiate ')) {
          res.statusCode = 400;
          return res.end(`Malformed authentication token: ${authorization}`);
        }

        checkCredentials();
        const cookieToken = opts.useCookies
          ? schManager.initCookie(req, res)
          : undefined;
        debug('cookieToken: ', cookieToken);

        const token = authorization.substring('Negotiate '.length);
        const messageType = getMessageType(token);
        debug('messageType: ', messageType);
        const buffer = decode(token);
        debug(hexDump(buffer));

        // test if first token
        if (
          messageType === 'NTLM_NEGOTIATE_01' ||
          messageType === 'Kerberos_1'
        ) {
          await schManager.waitForReleased(cookieToken);
          debug('schManager waitForReleased finished.');
          const ssoMethod = messageType.startsWith('NTLM')
            ? 'NTLM'
            : 'Kerberos';
          schManager.setMethod(ssoMethod, cookieToken);
        }

        const input: AcceptSecurityContextInput = {
          credential,
          clientSecurityContext: {
            SecBufferDesc: {
              ulVersion: 0,
              buffers: [buffer],
            },
          },
        };
        const serverContextHandle = schManager.getServerContextHandle(
          cookieToken
        );
        if (serverContextHandle) {
          debug('adding to input a serverContextHandle (not first exchange)');
          input.contextHandle = serverContextHandle;
        }
        debug('input just before calling AcceptSecurityContext', input);
        const serverSecurityContext = sspi.AcceptSecurityContext(input);
        debug(
          'serverSecurityContext just after AcceptSecurityContext',
          serverSecurityContext
        );
        if (
          !['SEC_E_OK', 'SEC_I_CONTINUE_NEEDED'].includes(
            serverSecurityContext.SECURITY_STATUS
          )
        ) {
          // 'SEC_I_COMPLETE_AND_CONTINUE', 'SEC_I_COMPLETE_NEEDED' are considered as errors because it is used
          // only by 'Digest' SSP. (not by Negotiate, Kerberos or NTLM)
          if (serverSecurityContext.SECURITY_STATUS === 'SEC_E_LOGON_DENIED') {
            res.statusCode = 401;
            return res.end(
              `SEC_E_LOGON_DENIED. (incorrect login/password, or account disabled, or locked, etc.). Protocol Message = ${messageType}.`
            );
          }
          throw new Error(
            'AcceptSecurityContext error: ' +
              serverSecurityContext.SECURITY_STATUS
          );
        }
        schManager.set(serverSecurityContext.contextHandle, cookieToken);

        debug('AcceptSecurityContext output buffer');
        debug(hexDump(serverSecurityContext.SecBufferDesc.buffers[0]));

        if (serverSecurityContext.SECURITY_STATUS === 'SEC_I_CONTINUE_NEEDED') {
          res.statusCode = 401;
          res.setHeader(
            'WWW-Authenticate',
            'Negotiate ' +
              encode(serverSecurityContext.SecBufferDesc.buffers[0])
          );
          return res.end();
        }

        const lastServerContextHandle = schManager.getServerContextHandle(
          cookieToken
        );
        const method = schManager.getMethod(cookieToken);
        const sso = new SSO(lastServerContextHandle, method);
        sso.setOptions(opts);
        await sso.load();
        req.sso = sso.getJSON();
        sspi.DeleteSecurityContext(lastServerContextHandle);
        schManager.release(cookieToken);

        // check if user is allowed.
        if (
          !opts.allowsAnonymousLogon &&
          req.sso.user.name === 'ANONYMOUS LOGON'
        ) {
          res.statusCode = 401;
          return res.end('Anonymous login not authorized.');
        }
        if (!opts.allowsGuest && req.sso.user.name === 'Guest') {
          res.statusCode = 401;
          return res.end('Guest not authorized.');
        }

        // user authenticated and allowed.
        res.setHeader(
          'WWW-Authenticate',
          'Negotiate ' + encode(serverSecurityContext.SecBufferDesc.buffers[0])
        );
        return next();
      } catch (e) {
        schManager.release();
        console.error(e);
        next(createError(400, `Error while doing SSO: ${e.message}`));
      }
    })();
  };
}
