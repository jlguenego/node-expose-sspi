import { sspi, sso, AcquireCredHandleInput } from '../src';
import os from 'os';
import { strict as assert } from 'assert';
import {
  CredentialWithExpiry,
  ServerSecurityContext,
  SecurityContext,
  InitializeSecurityContextInput,
  AcceptSecurityContextInput,
  Token,
} from '../lib/sspi';

describe('SSPI GetTokenInformation Unit Test', function () {
  let clientCred: CredentialWithExpiry;
  let serverCred: CredentialWithExpiry;
  let clientSecurityContext: SecurityContext;
  let serverSecurityContext: ServerSecurityContext;
  let userToken: Token;

  before(function () {
    const acquireCredentialsHandleClientInput: AcquireCredHandleInput = {
      packageName: 'Negotiate',
      credentialUse: 'SECPKG_CRED_OUTBOUND',
    };
    const acquireCredentialsHandleServerInput: AcquireCredHandleInput = {
      packageName: 'Negotiate',
      credentialUse: 'SECPKG_CRED_INBOUND',
    };
    if (sso.isOnDomain()) {
      const getCredentials = (): string => 'guess';
      acquireCredentialsHandleClientInput.authData = {
        domain: os.hostname().toUpperCase(),
        user: 'whatever',
        password: getCredentials(),
      };
    }

    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    clientCred = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleClientInput
    );
    serverCred = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleServerInput
    );

    const input: InitializeSecurityContextInput = {
      credential: clientCred.credential,
      targetName: 'kiki',
      cbMaxToken: packageInfo.cbMaxToken,
      targetDataRep: 'SECURITY_NATIVE_DREP',
    };
    clientSecurityContext = sspi.InitializeSecurityContext(input);

    const serverInput: AcceptSecurityContextInput = {
      credential: serverCred.credential,
      clientSecurityContext,
      contextReq: ['ASC_REQ_CONNECTION'],
      targetDataRep: 'SECURITY_NATIVE_DREP',
    };
    serverSecurityContext = sspi.AcceptSecurityContext(serverInput);

    const input2 = {
      credential: clientCred.credential,
      targetName: 'kiki',
      cbMaxToken: packageInfo.cbMaxToken,
      serverSecurityContext,
      contextHandle: clientSecurityContext.contextHandle,
    };
    const clientSecurityContext2 = sspi.InitializeSecurityContext(input2);
    const serverSecurityContext2 = sspi.AcceptSecurityContext({
      credential: serverCred.credential,
      clientSecurityContext: clientSecurityContext2,
      contextHandle: serverSecurityContext.contextHandle,
    });
    assert(serverSecurityContext2.SECURITY_STATUS === 'SEC_E_OK');

    sspi.ImpersonateSecurityContext(serverSecurityContext.contextHandle);
    userToken = sspi.OpenThreadToken(['TOKEN_QUERY', 'TOKEN_QUERY_SOURCE']);
    sspi.RevertSecurityContext(serverSecurityContext.contextHandle);
  });

  it('should test GetTokenInformation', function () {
    const userGroups = sspi.GetTokenInformation({
      accessToken: userToken,
      tokenInformationClass: 'TokenGroups',
    });
    assert(typeof userGroups[0] === 'string');
  });

  it('should test GetTokenInformation with bad filter', function () {
    const filter: any = true;
    try {
      sspi.GetTokenInformation({
        accessToken: userToken,
        tokenInformationClass: 'TokenGroups',
        filter: filter as string,
      });
    } catch (error) {
      assert((error as Error).message.includes('filter must be a string'));
    }
  });

  after(function () {
    sspi.CloseHandle(userToken);
    sspi.DeleteSecurityContext(serverSecurityContext.contextHandle);
    sspi.DeleteSecurityContext(clientSecurityContext.contextHandle);
    sspi.FreeCredentialsHandle(serverCred.credential);
    sspi.FreeCredentialsHandle(clientCred.credential);
  });
});
