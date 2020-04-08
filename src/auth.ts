import createError from 'http-errors';
import { decode, encode } from 'base64-arraybuffer';
import { hexDump } from './misc';
import { sspi, AcceptSecurityContextInput } from '../lib/api';
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
    useCookies: false,
  };
  Object.assign(opts, options);

  if (opts.useActiveDirectory && opts.useCookies) {
    opts.useCookies = false;
  }

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
        checkCredentials();

        if (opts.useCookies) {
          schManager.setCookieMode(req, res);
        }

        const authorization = req.headers.authorization;
        if (!authorization) {
          debug('no authorization');
          await schManager.waitForReleased();
          debug('schManager released');
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Negotiate');
          return res.end();
        }

        if (!authorization.startsWith('Negotiate ')) {
          return next(
            createError(400, `Malformed authentication token ${authorization}`)
          );
        }

        const token = authorization.substring('Negotiate '.length);
        const method = token.startsWith('YII') ? 'Kerberos' : 'NTLM';
        debug('SPNEGO token: ' + method);
        const buffer = decode(token);

        const input: AcceptSecurityContextInput = {
          credential,
          clientSecurityContext: {
            SecBufferDesc: {
              ulVersion: 0,
              buffers: [buffer],
            },
          },
        };
        const serverContextHandle = schManager.getServerContextHandle();
        if (serverContextHandle) {
          input.contextHandle = serverContextHandle;
        }
        debug('input', input);
        debug(hexDump(buffer));
        const serverSecurityContext = sspi.AcceptSecurityContext(input);
        debug('serverSecurityContext', serverSecurityContext);
        schManager.set(serverSecurityContext.contextHandle);

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
          const sch = schManager.getServerContextHandle();
          const sso = new SSO(sch, method);
          sso.setOptions(opts);
          await sso.load();
          req.sso = sso.getJSON();
          sspi.DeleteSecurityContext(sch);
          schManager.release();
        }
        next();
      } catch (e) {
        console.error(e);
        next(createError(400, `Error while doing SSO.`));
      }
    })();
  };
}
