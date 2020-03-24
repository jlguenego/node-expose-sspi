const { sspi } = require('node-expose-sspi');
const assert = require('assert').strict;

describe('SSPI Unit Test', function() {
  it('should return hello', function() {
    const result = sspi.hello();
    assert.equal(result, 'Coucou JL!!!');
  });

  it('should test EnumerateSecurityPackages', function() {
    const securityPackages = sspi.EnumerateSecurityPackages();
    assert(securityPackages instanceof Array);
    assert(securityPackages[0].Comment);
  });

  it('should test QuerySecurityPackageInfo', function() {
    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    assert(packageInfo);
    assert.equal(packageInfo.Name, 'Negotiate');
  });

  const acquireCredentialsHandleClientInput = {
    packageName: 'Negotiate',
    authData: {
      domain: 'CHOUCHOU',
      user: 'whatever',
      password: 'something',
    },
    credentialUse: 'SECPKG_CRED_OUTBOUND',
  };

  it('should test AcquireCredentialsHandle for client', function() {
    const clientCred = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleClientInput
    );
    assert(clientCred);
    assert(clientCred.credential);
  });

  const acquireCredentialsHandleServerInput = {
    packageName: 'Negotiate',
    credentialUse: 'SECPKG_CRED_INBOUND',
  };

  it('should test AcquireCredentialsHandle for server', function() {
    const serverCred = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleServerInput
    );
    assert(serverCred);
    assert(serverCred.credential);
  });

  let serverCred;
  let username;
  let serverSecurityContext;
  let clientSecurityContext;

  it('should test creating a security context', function() {
    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    const clientCred = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleClientInput
    );
    serverCred = sspi.AcquireCredentialsHandle(
      acquireCredentialsHandleServerInput
    );

    const input = {
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

    const serverInput = {
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

    const userGroups = sspi.GetTokenInformation(userToken, 'TokenGroups');
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

  it('should test LookupAccountName', function() {
    const sidObject = sspi.LookupAccountName(username);
    assert(sidObject instanceof Object);
    assert(sidObject.domain);
    assert(sidObject.sid);
  });

  it('should test GetUserName', function() {
    const username2 = sspi.GetUserName();
    // mylogin is not Guest.
    assert(username2 !== username);
    // const displayName = sspi.GetUserNameEx('NameDisplay');
    // assert(displayName);
  });

  it('should test QueryCredentialsAttributes', function() {
    const attributes = sspi.QueryCredentialsAttributes(
      serverCred.credential,
      'SECPKG_CRED_ATTR_NAMES'
    );
    assert(attributes instanceof Object);
    assert(attributes.sUserName);
  });

  it('should test QueryContextAttributes', function() {
    const names = sspi.QueryContextAttributes(
      serverSecurityContext.contextHandle,
      'SECPKG_ATTR_NAMES'
    );
    assert(names instanceof Object);
    assert(names.sUserName);
  });

  let accessToken;
  it('should test QuerySecurityContextToken', function() {
    accessToken = sspi.QuerySecurityContextToken(
      serverSecurityContext.contextHandle
    );
    assert(accessToken);
    assert(accessToken.startsWith('0x'));
  });

  it('should test GetTokenInformation', function() {
    const groups = sspi.GetTokenInformation(accessToken, 'TokenGroups');
    assert(groups instanceof Array);
    assert(typeof groups[0] === 'string');
  });

  it('should test CloseHandle', function() {
    sspi.CloseHandle(accessToken);
    let wentInCatch = false;
    try {
      sspi.CloseHandle(accessToken);
    } catch (e) {
      wentInCatch = true;
    }
    assert(wentInCatch);
  });

  it('should test DeleteSecurityContext', function() {
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

  it('should test FreeCredentialsHandle', function() {
    sspi.FreeCredentialsHandle(serverCred.credential);
    sspi.FreeCredentialsHandle(serverCred.credential);
  });
});

// // Test Active Directory
// sspi.CoInitializeEx(['COINIT_MULTITHREADED']);

// async function testADSI() {
//   try {
//     // 1) Global Catalog (specify domain uri is faster than servername)
//     const gc = await sspi.ADsOpenObject({
//       binding: 'GC:',
//       riid: 'IID_IADsContainer',
//     });
//     if (gc === undefined) {
//       throw new Error('Domain controller not reachable');
//     }
//     console.log('gc initialized', gc.__proto__.constructor.name);
//     const element = gc.Next();
//     console.log('element: ', element);
//     if (element === undefined) {
//       throw new Error('Domain controller not reachable');
//     }
//     const ds = element.QueryInterface('IID_IDirectorySearch');
//     console.log('ds: ', ds);

//     element.Release();
//     ds.Release();
//     gc.Release();

//     // 1) Get the Distinguished Name (LDAP notion) for the domain
//     const root = await sspi.ADsGestObject('LDAP://rootDSE');
//     const distinguishedName = root.Get('defaultNamingContext');
//     console.log('distinguishedName: ', distinguishedName);

//     const dirsearch = await sspi.ADsOpenObject({
//       binding: `LDAP://${distinguishedName}`,
//       riid: 'IID_IDirectorySearch',
//     });
//     console.log('dirsearch: ', dirsearch);
//     dirsearch.SetSearchPreference();
//     dirsearch.ExecuteSearch({
//       filter: '(&(objectClass=user)(objectCategory=person)(sn=*))',
//     });
//     let hr = dirsearch.GetFirstRow();
//     if (hr === adsi.S_ADS_NOMORE_ROWS) {
//       throw new Error('GetFirstRow: no more rows');
//     }

//     let colName = dirsearch.GetNextColumnName();
//     while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
//       console.log('colName: ', colName);
//       const value = await dirsearch.GetColumn(colName);
//       console.log('value: ', value);
//       colName = dirsearch.GetNextColumnName();
//     }

//     while (true) {
//       hr = dirsearch.GetNextRow();
//       if (hr === adsi.S_ADS_NOMORE_ROWS) {
//         break;
//       }
//       let colName = dirsearch.GetNextColumnName();
//       while (colName !== adsi.S_ADS_NOMORE_COLUMNS) {
//         console.log('colName: ', colName);
//         const value = await dirsearch.GetColumn(colName);
//         console.log('value: ', value);
//         colName = dirsearch.GetNextColumnName();
//       }
//     }

//     dirsearch.Release();

//     // 2) Get info about my account
//     console.log('about to do sspi.ADsGestObject');
//     const myself = await sspi.ADsGestObject(
//       `WinNT://jlg.local/${username},user`
//     );
//     console.log('about to do myself.Get');
//     const fullName = myself.Get('FullName');
//     console.log('fullName: ', fullName);
//     const objectGUID = myself.get_GUID();
//     console.log('objectGUID: ', objectGUID);

//     console.log('about to do sspi.ADsGestObject LDAP');
//     const iads = await sspi.ADsGestObject(
//       `LDAP://CN=${fullName},OU=JLG_LOCAL,${distinguishedName}`
//     );
//     console.log('about to do iads.get_Name');
//     const str = iads.get_Name();
//     console.log('str: ', str);
//     console.log('about to do iads.GetInfoEx');
//     iads.GetInfoEx('sn');
//     console.log('about to do iads.Get');
//     const sn = iads.Get('sn');
//     console.log('sn: ', sn);
//     const givenName = iads.Get('givenName');
//     console.log('givenName: ', givenName);
//     const guid = iads.get_GUID();
//     console.log('guid: ', guid);
//     iads.Release();

//     const myself2 = await sspi.ADsGestObject(`LDAP://jlg.local/<GUID=${guid}>`);
//     console.log('about to do myself2.Get');
//     const cname = myself2.get_Name();
//     console.log('cname: ', cname);
//     myself2.Release();
//   } catch (error) {
//     console.log('error: ', error);
//   }

//   sspi.CoUninitialize();

//   const str = sspi.GetComputerNameEx('ComputerNameDnsDomain');
//   console.log('str: ', str);
// }

// testADSI();
