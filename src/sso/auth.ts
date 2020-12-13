import createError from 'http-errors';
import { IncomingMessage, ServerResponse } from 'http';
import dbg from 'debug';

import { sspi, AcceptSecurityContextInput } from '../../lib/api';
import { hexDump, getMessageType, encode, decode } from './misc';
import { SSO } from './SSO';
import { ServerContextHandleManager } from './schm/ServerContextHandleManager';
import {
  AuthOptions,
  MessageType,
  Middleware,
  NextFunction,
  SSOMethod,
  SSOObject,
} from './interfaces';
import { getStatusInfo } from './status';
import { getKerberosDetails, getKerberosResponseDetails } from './kerberos';

const DEBUG_KEY = 'node-expose-sspi:auth';
const debug = dbg(DEBUG_KEY);
const isDbgEnabled = dbg.enabled(DEBUG_KEY);

const WWW_AUTHENTICATE = 'WWW-Authenticate';

/**
 * Tries to get SSO information from browser. If success, the SSO info
 * is stored under req.sso
 *
 * @export
 * @param {AuthOptions} [options={}]
 * @returns {RequestHandler}
 */
export function auth(options: Partial<AuthOptions> = {}): Middleware {
  const opts: AuthOptions = {
    useActiveDirectory: true,
    useGroups: true,
    useOwner: false,
    groupFilterRegex: '.*',
    allowsGuest: false,
    allowsAnonymousLogon: false,
    useSession: false,
    forceNTLM: false,
    ...options,
  };

  const authenticationType = opts.forceNTLM ? 'NTLM' : 'Negotiate';
  const packageName = 'Negotiate';

  let { credential, tsExpiry } = sspi.AcquireCredentialsHandle({
    packageName,
  });

  const checkCredentials = (): void => {
    if (tsExpiry < new Date()) {
      // renew server credentials
      sspi.FreeCredentialsHandle(credential);
      const renewed = sspi.AcquireCredentialsHandle({
        packageName,
      });
      credential = renewed.credential;
      tsExpiry = renewed.tsExpiry;
    }
  };

  const schManager = new ServerContextHandleManager();

  // returns the node middleware.
  return (
    req: IncomingMessage,
    res: ServerResponse,
    next: NextFunction
  ): void => {
    if (opts.useSession) {
      const session = ((req as unknown) as { session?: { sso: SSOObject } })
        .session;
      debug('check the session: ', session);
      if (session?.sso) {
        session.sso.cached = true;
        req.sso = session.sso;
        next();
        return;
      }
      debug('no session.sso');
    }
    (async (): Promise<void> => {
      let messageType: MessageType = 'Unknown';

      try {
        const authorization = req.headers.authorization;
        if (!authorization) {
          debug('no authorization key in header');
          res.statusCode = 401;
          res.setHeader(WWW_AUTHENTICATE, authenticationType);
          return res.end();
        }

        if (!authorization.startsWith(authenticationType + ' ')) {
          res.statusCode = 400;
          return res.end(`Malformed authentication token: ${authorization}`);
        }

        checkCredentials();
        const token = authorization.substring(
          (authenticationType + ' ').length
        );
        messageType = getMessageType(token);
        debug('messageType: ', messageType);
        const buffer = decode(token);
        debug(hexDump(buffer));

        // test if first token
        if (
          messageType === 'NTLM_NEGOTIATE_01' ||
          messageType === 'Kerberos_1'
        ) {
          schManager.release(req);
        }

        // kerberos token case
        if (isDbgEnabled && messageType === 'Kerberos_1') {
          debug('Kerberos_1 details: ', getKerberosDetails(buffer));
        }

        const input: AcceptSecurityContextInput = {
          credential,
          SecBufferDesc: {
            ulVersion: 0,
            buffers: [buffer],
          },
        };
        const serverContextHandle = schManager.get(req);
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
        if (isDbgEnabled && messageType.startsWith('Kerberos')) {
          debug(
            'Kerberos output details: ',
            getKerberosResponseDetails(
              serverSecurityContext.SecBufferDesc.buffers[0]
            )
          );
        }
        const failed = !['SEC_E_OK', 'SEC_I_CONTINUE_NEEDED'].includes(
          serverSecurityContext.SECURITY_STATUS
        );
        if (failed) {
          schManager.release(req);
          // 'SEC_I_COMPLETE_AND_CONTINUE', 'SEC_I_COMPLETE_NEEDED' are considered as errors because it is used
          // only by 'Digest' SSP. (not by Negotiate, Kerberos or NTLM)
          if (serverSecurityContext.SECURITY_STATUS === 'SEC_E_LOGON_DENIED') {
            next(
              createError(
                401,
                `SEC_E_LOGON_DENIED. (incorrect login/password, or account disabled, or locked, etc.). Protocol Message = ${messageType}.`
              )
            );
            return;
          }
          throw new Error(
            'AcceptSecurityContext error: ' +
              serverSecurityContext.SECURITY_STATUS
          );
        }
        schManager.set(req, serverSecurityContext.contextHandle);

        debug('AcceptSecurityContext output buffer');
        debug(hexDump(serverSecurityContext.SecBufferDesc.buffers[0]));

        if (serverSecurityContext.SECURITY_STATUS === 'SEC_I_CONTINUE_NEEDED') {
          res.statusCode = 401;
          res.setHeader(
            WWW_AUTHENTICATE,
            authenticationType +
              ' ' +
              encode(serverSecurityContext.SecBufferDesc.buffers[0])
          );
          return res.end();
        }

        const lastServerContextHandle = serverSecurityContext.contextHandle;
        if (!lastServerContextHandle) {
          throw new Error('cannot get the server context handle');
        }
        const method: SSOMethod = messageType.startsWith('NTLM')
          ? 'NTLM'
          : 'Kerberos';
        const sso = new SSO(lastServerContextHandle, method);
        sso.setOptions(opts);
        await sso.load();
        req.sso = sso.getJSON();
        if (opts.useSession) {
          debug('session case');
          const session = ((req as unknown) as { session?: { sso: SSOObject } })
            .session;
          debug('session: ', session);
          if (session) {
            req.sso.cached = false;
            session.sso = req.sso;
          }
          debug('session again: ', session);
        }
        sspi.DeleteSecurityContext(lastServerContextHandle);
        schManager.release(req);

        // check if user is allowed.
        if (
          !opts.allowsAnonymousLogon &&
          req.sso?.user?.name === 'ANONYMOUS LOGON'
        ) {
          res.statusCode = 401;
          return res.end('Anonymous login not authorized.');
        }
        if (!opts.allowsGuest && req.sso?.user?.name === 'Guest') {
          res.statusCode = 401;
          return res.end('Guest not authorized.');
        }

        // user authenticated and allowed.
        res.setHeader(
          WWW_AUTHENTICATE,
          authenticationType +
            ' ' +
            encode(serverSecurityContext.SecBufferDesc.buffers[0])
        );
        return next();
      } catch (e) {
        schManager.release(req);
        console.error(e);
        console.error('statusInfo: ', getStatusInfo());
        console.error('messageType: ', messageType);
        next(createError(401, `Error while doing SSO: ${e.message}`));
      }
    })();
  };
}
