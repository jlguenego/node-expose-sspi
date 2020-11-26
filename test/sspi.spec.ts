import { strict as assert } from 'assert';

import { sspi, AcquireCredHandleInput, sso, AccessToken } from '../src';
import {
  CredentialWithExpiry,
  ServerSecurityContext,
  SecurityContext,
  InitializeSecurityContextInput,
  AcceptSecurityContextInput,
} from '../lib/sspi';

describe('SSPI Unit Test', () => {
  it('should return hello', () => {
    const result = sspi.hello();
    assert.equal(result, 'Coucou JL!!!');
  });

  it('should test EnumerateSecurityPackages', () => {
    const securityPackages = sspi.EnumerateSecurityPackages();
    assert(securityPackages instanceof Array);
    assert(securityPackages[0].Comment);
  });

  it('should test QuerySecurityPackageInfo', () => {
    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    assert(packageInfo);
    assert.equal(packageInfo.Name, 'Negotiate');
  });

  const acquireCredentialsHandleClientInput: AcquireCredHandleInput = {
    packageName: 'Negotiate',
    credentialUse: 'SECPKG_CRED_OUTBOUND',
  };

  it('should test AcquireCredentialsHandle for client', () => {
    const clientCred = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleClientInput
    );
    assert(clientCred);
    assert(clientCred.credential);
  });

  const acquireCredentialsHandleServerInput: AcquireCredHandleInput = {
    packageName: 'Negotiate',
    credentialUse: 'SECPKG_CRED_INBOUND',
  };

  it('should test AcquireCredentialsHandle for server', () => {
    const sc = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleServerInput
    );
    assert(sc);
    assert(sc.credential);
  });

  if (sso.isOnDomain() && !sso.isActiveDirectoryReachable()) {
    return;
  }

  let serverCred: CredentialWithExpiry;
  let username: string;
  let serverSecurityContext: ServerSecurityContext;
  let clientSecurityContext: SecurityContext;

  it('should test creating a security context', () => {
    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    const clientCred = sspi.AcquireCredentialsHandle(
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

    assert(clientSecurityContext);
    assert(
      clientSecurityContext.SecBufferDesc.buffers[0] instanceof ArrayBuffer
    );

    const serverInput: AcceptSecurityContextInput = {
      credential: serverCred.credential,
      SecBufferDesc: clientSecurityContext.SecBufferDesc,
      contextReq: ['ASC_REQ_CONNECTION'],
      targetDataRep: 'SECURITY_NATIVE_DREP',
    };
    serverSecurityContext = sspi.AcceptSecurityContext(serverInput);

    assert(serverSecurityContext);
    assert(
      serverSecurityContext.SecBufferDesc.buffers[0] instanceof ArrayBuffer
    );

    const input2 = {
      credential: clientCred.credential,
      targetName: 'kiki',
      cbMaxToken: packageInfo.cbMaxToken,
      SecBufferDesc: serverSecurityContext.SecBufferDesc,
      contextHandle: clientSecurityContext.contextHandle,
    } as InitializeSecurityContextInput;
    const clientSecurityContext2 = sspi.InitializeSecurityContext(input2);

    assert(clientSecurityContext2);
    assert(
      clientSecurityContext2.SecBufferDesc.buffers[0] instanceof ArrayBuffer
    );

    const serverSecurityContext2 = sspi.AcceptSecurityContext({
      credential: serverCred.credential,
      SecBufferDesc: clientSecurityContext2.SecBufferDesc,
      contextHandle: serverSecurityContext.contextHandle,
    });

    assert(serverSecurityContext2);
    assert(
      serverSecurityContext2.SecBufferDesc.buffers[0] instanceof ArrayBuffer
    );
    assert(serverSecurityContext2.SECURITY_STATUS === 'SEC_E_OK');

    sspi.FreeCredentialsHandle(clientCred.credential);

    sspi.ImpersonateSecurityContext(serverSecurityContext.contextHandle);

    username = sspi.GetUserName();

    assert(username);

    const nameSamCompatible = sspi.GetUserNameEx('NameSamCompatible');
    assert(nameSamCompatible);

    const userToken = sspi.OpenThreadToken([
      'TOKEN_QUERY',
      'TOKEN_QUERY_SOURCE',
    ]);
    assert(typeof userToken === 'string');
    assert(userToken.startsWith('0x'));

    sspi.RevertSecurityContext(serverSecurityContext.contextHandle);

    const userGroups = sspi.GetTokenInformation({
      accessToken: userToken,
      tokenInformationClass: 'TokenGroups',
    });
    sspi.CloseHandle(userToken);
    assert(userGroups);
    assert(userGroups instanceof Array);
    assert(typeof userGroups[0] === 'string');

    let wentInCatch = false;
    try {
      sspi.CloseHandle(userToken);
    } catch (e) {
      wentInCatch = true;
    }
    assert(wentInCatch);
  });

  it('should test LookupAccountName', () => {
    const sidObject = sspi.LookupAccountName(username);
    assert(sidObject instanceof Object);
    assert(sidObject.domain);
    assert(sidObject.sid);
  });

  it('should test GetUserName', () => {
    const username2 = sspi.GetUserName();
    assert(username2 === username);
  });

  it('should test QueryCredentialsAttributes', () => {
    const attributes = sspi.QueryCredentialsAttributes(
      serverCred.credential,
      'SECPKG_CRED_ATTR_NAMES'
    );
    assert(attributes instanceof Object);
    assert(attributes.sUserName);
  });

  it('should test QueryContextAttributes', () => {
    const names = sspi.QueryContextAttributes(
      serverSecurityContext.contextHandle,
      'SECPKG_ATTR_NAMES'
    );
    assert(names instanceof Object);
    assert(names.sUserName);
  });

  let accessToken: AccessToken;
  it('should test QuerySecurityContextToken', () => {
    accessToken = sspi.QuerySecurityContextToken(
      serverSecurityContext.contextHandle
    );
    assert(accessToken);
    assert(accessToken.startsWith('0x'));
  });

  it('should test GetTokenInformation', () => {
    const groups = sspi.GetTokenInformation({
      accessToken,
      tokenInformationClass: 'TokenGroups',
    });
    assert(groups instanceof Array);
    assert(typeof groups[0] === 'string');
  });

  it('should test CloseHandle', () => {
    sspi.CloseHandle(accessToken);
    let wentInCatch = false;
    try {
      sspi.CloseHandle(accessToken);
    } catch (e) {
      wentInCatch = true;
    }
    assert(wentInCatch);
  });

  it('should test DeleteSecurityContext', () => {
    sspi.DeleteSecurityContext(serverSecurityContext.contextHandle);
    sspi.DeleteSecurityContext(clientSecurityContext.contextHandle);
    let wentInCatch = false;
    try {
      sspi.DeleteSecurityContext(serverSecurityContext.contextHandle);
    } catch (e) {
      wentInCatch = true;
    }
    assert(wentInCatch);
  });

  it('should test FreeCredentialsHandle', () => {
    sspi.FreeCredentialsHandle(serverCred.credential);
    sspi.FreeCredentialsHandle(serverCred.credential);
  });

  it('should test AllocateAndInitializeSid', () => {
    const sid = sspi.AllocateAndInitializeSid();
    assert(sid);
    sspi.CheckTokenMembership(sid);
    sspi.FreeSid(sid);
    // the second time lead to a process crash.
    // sspi.FreeSid(sid);
  });
});
