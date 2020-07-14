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

describe('SSPI Unit Test', function () {
  it('should return hello', function () {
    const result = sspi.hello();
    assert.equal(result, 'Coucou JL!!!');
  });

  it('should test EnumerateSecurityPackages', function () {
    const securityPackages = sspi.EnumerateSecurityPackages();
    assert(securityPackages instanceof Array);
    assert(securityPackages[0].Comment);
  });

  it('should test QuerySecurityPackageInfo', function () {
    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    assert(packageInfo);
    assert.equal(packageInfo.Name, 'Negotiate');
  });

  const acquireCredentialsHandleClientInput: AcquireCredHandleInput = {
    packageName: 'Negotiate',
    credentialUse: 'SECPKG_CRED_OUTBOUND',
  };

  if (sso.isOnDomain()) {
    acquireCredentialsHandleClientInput.authData = {
      domain: os.hostname().toUpperCase(),
      user: 'whatever',
      password: 'guess',
    };
  }

  it('should test AcquireCredentialsHandle for client', function () {
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

  it('should test AcquireCredentialsHandle for server', function () {
    const sc = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleServerInput
    );
    assert(sc);
    assert(sc.credential);
  });

  let serverCred: CredentialWithExpiry;
  let username: string;
  let serverSecurityContext: ServerSecurityContext;
  let clientSecurityContext: SecurityContext;

  it('should test creating a security context', function () {
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
      clientSecurityContext,
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
      serverSecurityContext,
      contextHandle: clientSecurityContext.contextHandle,
    };
    const clientSecurityContext2 = sspi.InitializeSecurityContext(input2);
    assert(clientSecurityContext2);
    assert(
      clientSecurityContext2.SecBufferDesc.buffers[0] instanceof ArrayBuffer
    );

    const serverSecurityContext2 = sspi.AcceptSecurityContext({
      credential: serverCred.credential,
      clientSecurityContext: clientSecurityContext2,
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

  it('should test LookupAccountName', function () {
    const sidObject = sspi.LookupAccountName(username);
    assert(sidObject instanceof Object);
    assert(sidObject.domain);
    assert(sidObject.sid);
  });

  it('should test GetUserName', function () {
    const username2 = sspi.GetUserName();
    // on Domain, username2='Guest'
    if (sso.isOnDomain()) {
      assert(username2 !== username);
    } else {
      assert(username2 === username);
    }
  });

  it('should test QueryCredentialsAttributes', function () {
    const attributes = sspi.QueryCredentialsAttributes(
      serverCred.credential,
      'SECPKG_CRED_ATTR_NAMES'
    );
    assert(attributes instanceof Object);
    assert(attributes.sUserName);
  });

  it('should test QueryContextAttributes', function () {
    const names = sspi.QueryContextAttributes(
      serverSecurityContext.contextHandle,
      'SECPKG_ATTR_NAMES'
    );
    assert(names instanceof Object);
    assert(names.sUserName);
  });

  let accessToken: Token;
  it('should test QuerySecurityContextToken', function () {
    accessToken = sspi.QuerySecurityContextToken(
      serverSecurityContext.contextHandle
    );
    assert(accessToken);
    assert(accessToken.startsWith('0x'));
  });

  it('should test GetTokenInformation', function () {
    const groups = sspi.GetTokenInformation({
      accessToken,
      tokenInformationClass: 'TokenGroups',
    });
    assert(groups instanceof Array);
    assert(typeof groups[0] === 'string');
  });

  it('should test CloseHandle', function () {
    sspi.CloseHandle(accessToken);
    let wentInCatch = false;
    try {
      sspi.CloseHandle(accessToken);
    } catch (e) {
      wentInCatch = true;
    }
    assert(wentInCatch);
  });

  it('should test DeleteSecurityContext', function () {
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

  it('should test FreeCredentialsHandle', function () {
    sspi.FreeCredentialsHandle(serverCred.credential);
    sspi.FreeCredentialsHandle(serverCred.credential);
  });
});
