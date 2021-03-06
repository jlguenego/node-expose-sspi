import {
  sso,
  sspi,
  sysinfo,
  CredentialUseFlag,
  AcquireCredHandleInput,
  InitializeSecurityContextInput,
} from '../..';
import os from 'os';

const result = sspi.hello();
console.log('result: ', result);
const securityPackages = sspi.EnumerateSecurityPackages();
console.log(securityPackages);
const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
console.log('packageInfo: ', packageInfo);

// Are we on a domain ?
const domain = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
console.log('domain: ', domain);
const isOnDomain = domain === undefined;
console.log('isOnDomain: ', isOnDomain);

const nodeUsername = os.userInfo().username;
console.log('nodeUsername: ', nodeUsername);
const hostname = os.hostname();
console.log('hostname: ', hostname);

const credInput = {
  packageName: 'Negotiate',
  authData: {
    domain: isOnDomain ? domain : hostname,
    user: nodeUsername,
    // the auth will fail if the account does not have a password set.
    // if password is set, then it will be authenticated as Guest.
    password: 'toto',
  },
  credentialUse: 'SECPKG_CRED_OUTBOUND' as CredentialUseFlag,
} as AcquireCredHandleInput;
console.log('credInput: ', credInput);

const clientCred = sspi.AcquireCredentialsHandle(credInput);
console.log('clientCred: ', clientCred);
const serverCred = sspi.AcquireCredentialsHandle({
  packageName: 'Negotiate',
  credentialUse: 'SECPKG_CRED_INBOUND',
});
console.log('serverCred: ', serverCred);
const input = {
  credential: clientCred.credential,
  targetName: 'kiki',
  cbMaxToken: packageInfo.cbMaxToken,
} as InitializeSecurityContextInput;
console.log('input: ', input);
const clientSecurityContext = sspi.InitializeSecurityContext(input);
console.log('clientSecurityContext: ', clientSecurityContext);
console.log(sso.hexDump(clientSecurityContext.SecBufferDesc.buffers[0]));
const serverSecurityContext = sspi.AcceptSecurityContext({
  credential: serverCred.credential,
  SecBufferDesc: clientSecurityContext.SecBufferDesc,
  contextReq: ['ASC_REQ_CONNECTION'],
  targetDataRep: 'SECURITY_NATIVE_DREP',
});
console.log('serverSecurityContext: ', serverSecurityContext);
console.log(sso.hexDump(serverSecurityContext.SecBufferDesc.buffers[0]));
const input2 = {
  credential: clientCred.credential,
  targetName: 'kiki',
  cbMaxToken: packageInfo.cbMaxToken,
  SecBufferDesc: serverSecurityContext.SecBufferDesc,
  contextHandle: clientSecurityContext.contextHandle,
} as InitializeSecurityContextInput;
console.log('input2: ', input2);
const clientSecurityContext2 = sspi.InitializeSecurityContext(input2);
console.log('clientSecurityContext2: ', clientSecurityContext2);
console.log(sso.hexDump(clientSecurityContext2.SecBufferDesc.buffers[0]));

const serverSecurityContext2 = sspi.AcceptSecurityContext({
  credential: serverCred.credential,
  SecBufferDesc: clientSecurityContext2.SecBufferDesc,
  contextHandle: serverSecurityContext.contextHandle,
});
console.log('serverSecurityContext2: ', serverSecurityContext2);
console.log(sso.hexDump(serverSecurityContext2.SecBufferDesc.buffers[0]));

sspi.FreeCredentialsHandle(clientCred.credential);
console.log('free client credentials ok');

// security context ok

sspi.ImpersonateSecurityContext(serverSecurityContext.contextHandle);
console.log('impersonate security context ok');
const username = sspi.GetUserName();
console.log('username: ', username);

try {
  const displayName = sspi.GetUserNameEx('NameDisplay');
  console.log('displayName: ', displayName);
} catch (e) {
  console.log('this account does not seems to have a Display Name');
}

const NameSamCompatible = sspi.GetUserNameEx('NameSamCompatible');
console.log('NameSamCompatible: ', NameSamCompatible);
try {
  const NameDnsDomain = sspi.GetUserNameEx('NameDnsDomain');
  console.log('NameDnsDomain: ', NameDnsDomain);
} catch (e) {
  console.log('error for fun... no worries: ', e);
}

const userToken = sspi.OpenThreadToken(['TOKEN_QUERY', 'TOKEN_QUERY_SOURCE']);
console.log('userToken: ', userToken);

sspi.RevertSecurityContext(serverSecurityContext.contextHandle);
console.log('revert security context ok');

const userGroups = sspi.GetTokenInformation({
  accessToken: userToken,
  tokenInformationClass: 'TokenGroups',
  filter: '.*dmin.*',
});
console.log('userGroups: ', userGroups);

const userPrivileges = sspi.GetTokenInformation({
  accessToken: userToken,
  tokenInformationClass: 'TokenPrivileges',
});
console.log('userPrivileges: ', userPrivileges);

sspi.CloseHandle(userToken);
console.log('CloseHandle ok');

const ownerToken = sspi.OpenProcessToken(['TOKEN_QUERY', 'TOKEN_QUERY_SOURCE']);
console.log('ownerToken: ', ownerToken);

const ownerPrivileges = sspi.GetTokenInformation({
  accessToken: ownerToken,
  tokenInformationClass: 'TokenPrivileges',
});
console.log('ownerPrivileges: ', ownerPrivileges);

const sidObject = sspi.LookupAccountName(username);
console.log('sidObject: ', sidObject);

const username2 = sspi.GetUserName();
console.log('username2: ', username2);

const attributes = sspi.QueryCredentialsAttributes(
  serverCred.credential,
  'SECPKG_CRED_ATTR_NAMES'
);
console.log('attributes: ', attributes);

const names = sspi.QueryContextAttributes(
  serverSecurityContext.contextHandle,
  'SECPKG_ATTR_NAMES'
);
console.log('names: ', names);

const accessToken = sspi.QuerySecurityContextToken(
  serverSecurityContext.contextHandle
);
console.log('accessToken: ', accessToken);

const groups = sspi.GetTokenInformation({
  accessToken,
  tokenInformationClass: 'TokenGroups',
});
console.log('groups: ', groups);

sspi.CloseHandle(accessToken);
console.log('CloseHandle ok');

sspi.DeleteSecurityContext(serverSecurityContext.contextHandle);
console.log('DeleteSecurityContext ok');
sspi.DeleteSecurityContext(clientSecurityContext.contextHandle);
console.log('DeleteSecurityContext ok');

sspi.FreeCredentialsHandle(serverCred.credential);
console.log('free server credentials ok');
