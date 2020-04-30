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
    groupFilterRegex: ".*",
  };
  Object.assign(opts, options);

  // if (opts.useActiveDirectory && opts.useCookies) {
  //   opts.useCookies = false;
  // }

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
          return next(
            createError(400, `Malformed authentication token ${authorization}`)
          );
        }

        checkCredentials();
        const cookieToken = opts.useCookies
          ? schManager.initCookie(req, res)
          : undefined;
        debug('cookieToken: ', cookieToken);

        const token = authorization.substring('Negotiate '.length);
        const buffer = decode(token);
        debug(hexDump(buffer));

        const messageType = getMessageType(token);
        debug('messageType: ', messageType);
        // test if first token
        if (messageType === 'NTLM_NEGOTIATE_01' || messageType === 'Kerberos_1') {
          await schManager.waitForReleased(cookieToken);
          debug('schManager waitForReleased finished.');
          const method = messageType.startsWith('NTLM') ? 'NTLM' : 'Kerberos';
          schManager.setMethod(method, cookieToken);
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
          input.contextHandle = serverContextHandle;
        }
        debug('input', input);
        const serverSecurityContext = sspi.AcceptSecurityContext(input);
        debug('serverSecurityContext', serverSecurityContext);
        if (
          !['SEC_E_OK', 'SEC_I_CONTINUE_NEEDED'].includes(
            serverSecurityContext.SECURITY_STATUS
          )
        ) {
          // 'SEC_I_COMPLETE_AND_CONTINUE', 'SEC_I_COMPLETE_NEEDED' are considered as errors because it is used
          // only by 'Digest' SSP. (not by Negotiate, Kerberos or NTLM)
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

        if (serverSecurityContext.SECURITY_STATUS === 'SEC_E_OK') {
          res.setHeader(
            'WWW-Authenticate',
            'Negotiate ' +
              encode(serverSecurityContext.SecBufferDesc.buffers[0])
          );
          const lastServerContextHandle = schManager.getServerContextHandle(
            cookieToken
          );
          const method = schManager.getMethod(cookieToken);
          const sso = new SSO(lastServerContextHandle, method);
          sso.setOptions(opts);
          await sso.load();
          req.sso = sso.getJSON();
          sspi.DeleteSecurityContext(lastServerContextHandle);
          schManager.release();
        }
        next();
      } catch (e) {
        schManager.release();
        console.error(e);
        next(createError(400, `Error while doing SSO: ${e.message}`));
      }
    })();
  };
}
