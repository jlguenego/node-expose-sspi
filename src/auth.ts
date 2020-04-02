import createError from 'http-errors';
import { decode, encode } from 'base64-arraybuffer';
import { hexDump } from './misc';
import { sspi, AcceptSecurityContextInput } from '../lib/api';
import { RequestHandler } from 'express';
import { SSO } from './SSO';
import { ServerContextHandleManager } from './ServerContextHandleManager';
import dbg from 'debug';
import { AuthOptions } from './interfaces';

const debug = dbg('node-expose-sspi:auth');

/**
 * Tries to get SSO information from browser. If success, the SSO info
 * is stored under req.sso
 *
 * @returns {RequestHandler} a middleware
 */
export function auth(options: AuthOptions = {}): RequestHandler {
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

  const schManager = new ServerContextHandleManager(10000);

  // returns the node middleware.
  return async (req, res, next) => {
    try {
      checkCredentials();

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
          'Negotiate ' + encode(serverSecurityContext.SecBufferDesc.buffers[0])
        );
        return res.end();
      }

      if (serverSecurityContext.SECURITY_STATUS === 'SEC_E_OK') {
        res.setHeader(
          'WWW-Authenticate',
          'Negotiate ' + encode(serverSecurityContext.SecBufferDesc.buffers[0])
        );
        const serverContextHandle = schManager.getServerContextHandle();
        const sso = new SSO(serverContextHandle, method);
        sso.setOptions(options);
        await sso.load();
        req.sso = sso.getJSON();
        sspi.DeleteSecurityContext(serverContextHandle);
        schManager.release();
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
