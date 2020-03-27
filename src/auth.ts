import createError from 'http-errors';
import { decode, encode } from 'base64-arraybuffer';
import { hexDump, trace } from './misc';
import { sspi, SecurityContext, AcceptSecurityContextInput } from '../lib/api';
import { RequestHandler } from 'express';
import { SSO } from './SSO';
import { init } from './userdb';

/**
 * Tries to get SSO information from browser. If success, the SSO info
 * is stored under req.sso
 *
 * @returns {RequestHandler} a middleware
 */
export function auth(): RequestHandler {
  // start in parallel the async init()
  init();

  let { credential, tsExpiry } = sspi.AcquireCredentialsHandle({
    packageName: 'Negotiate',
  });

  const checkCredentials = () => {
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

  // serverContextHandle seems to be useful only for NTLM, not Kerberos.
  // because Kerberos will not request many times the client to complete the SSO Authentication.
  let serverContextHandle: SecurityContext;

  // returns the middleware.
  return async (req, res, next) => {
    try {
      checkCredentials();

      const authorization = req.get('authorization');
      if (!authorization) {
        serverContextHandle = undefined;
        return res
          .status(401)
          .set('WWW-Authenticate', 'Negotiate')
          .end();
      }

      if (!authorization.startsWith('Negotiate ')) {
        return next(
          createError(400, `Malformed authentication token ${authorization}`)
        );
      }

      const token = authorization.substring('Negotiate '.length);
      const method = token.startsWith('YII') ? 'Kerberos' : 'NTLM';
      trace('SPNEGO token: ' + method);
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
      if (serverContextHandle) {
        input.contextHandle = serverContextHandle;
      }
      const serverSecurityContext = sspi.AcceptSecurityContext(input);
      serverContextHandle = serverSecurityContext.contextHandle;

      trace(hexDump(serverSecurityContext.SecBufferDesc.buffers[0]));

      if (serverSecurityContext.SECURITY_STATUS === 'SEC_I_CONTINUE_NEEDED') {
        return res
          .status(401)
          .set(
            'WWW-Authenticate',
            'Negotiate ' +
              encode(serverSecurityContext.SecBufferDesc.buffers[0])
          )
          .end();
      }

      if (serverSecurityContext.SECURITY_STATUS === 'SEC_E_OK') {
        res.set(
          'WWW-Authenticate',
          'Negotiate ' + encode(serverSecurityContext.SecBufferDesc.buffers[0])
        );

        const sso = new SSO(serverContextHandle, method);
        await sso.load();
        req.sso = sso.getJSON();
        sspi.DeleteSecurityContext(serverContextHandle);
        serverContextHandle = undefined;
      }
    } catch (e) {
      console.error(e);
      next(
        createError(
          400,
          `Unexpected error while doing SSO. Please contact your system administrator.`
        )
      );
    }

    next();
  };
}
