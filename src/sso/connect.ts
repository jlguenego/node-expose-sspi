import { hexDump } from './misc';
import {
  sspi,
  UserCredential,
  SecurityContext,
  InitializeSecurityContextInput,
  AcceptSecurityContextInput,
} from '../../lib/api';
import { SSO } from './SSO';
import dbg from 'debug';

const debug = dbg('node-expose-sspi:connect');

/**
 * Retrieves SSO information from an explicit credential (login/password and domain).
 * The SSO information will be retrieved only if the credential
 * matches a local account or a domain account.
 *
 * @param {sspi.UserCredential} userCredential
 * @returns {SSO} the SSO object or undefined.
 */
export async function connect(userCredential: UserCredential): Promise<SSO> {
  const errorMsg = 'error while building the security context';
  const badLoginPasswordMsg = 'sorry mate, wrong login/password.';
  try {
    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    const clientCred = sspi.AcquireCredentialsHandle({
      packageName: 'Negotiate',
      authData: userCredential,
    });
    const serverCred = sspi.AcquireCredentialsHandle({
      packageName: 'Negotiate',
    });

    let serverSecurityContext: SecurityContext;
    let clientSecurityContext: SecurityContext;
    const clientInput: InitializeSecurityContextInput = {
      credential: clientCred.credential,
      targetName: 'kiki',
      cbMaxToken: packageInfo.cbMaxToken,
    };

    const serverInput: AcceptSecurityContextInput = {
      credential: serverCred.credential,
      clientSecurityContext: undefined,
    };
    let i = 0;
    while (true) {
      debug('i: ', i);
      i++;

      if (serverSecurityContext) {
        clientInput.serverSecurityContext = serverSecurityContext;
        clientInput.contextHandle = clientSecurityContext.contextHandle;
      }
      clientSecurityContext = sspi.InitializeSecurityContext(clientInput);
      debug('clientSecurityContext: ', clientSecurityContext);
      debug(hexDump(clientSecurityContext.SecBufferDesc.buffers[0]));
      if (
        clientSecurityContext.SECURITY_STATUS !== 'SEC_I_CONTINUE_NEEDED' &&
        clientSecurityContext.SECURITY_STATUS !== 'SEC_E_OK'
      ) {
        throw errorMsg;
      }

      serverInput.clientSecurityContext = clientSecurityContext;
      if (serverSecurityContext) {
        serverInput.contextHandle = serverSecurityContext.contextHandle;
      }

      serverSecurityContext = sspi.AcceptSecurityContext(serverInput);
      debug('serverSecurityContext: ', serverSecurityContext);
      if (
        serverSecurityContext.SECURITY_STATUS !== 'SEC_I_CONTINUE_NEEDED' &&
        serverSecurityContext.SECURITY_STATUS !== 'SEC_E_OK'
      ) {
        if (serverSecurityContext.SECURITY_STATUS === 'SEC_E_LOGON_DENIED') {
          throw badLoginPasswordMsg;
        }
        throw errorMsg;
      }

      debug(hexDump(serverSecurityContext.SecBufferDesc.buffers[0]));
      if (serverSecurityContext.SECURITY_STATUS !== 'SEC_E_OK') {
        continue;
      }
      // we have the security context !!!
      debug('We have the security context !!!');
      break;
    }

    const sso = new SSO(serverSecurityContext.contextHandle);
    await sso.load();
    if (sso.user.name === 'Guest') {
      throw badLoginPasswordMsg;
    }
    return sso;
  } catch (e) {
    console.error('error', e);
  }

  return undefined;
}
