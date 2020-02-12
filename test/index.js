const sspi = require("..");
const { printHexDump } = require("../misc/misc");

const result = sspi.hello();
console.log("result: ", result);
const securityPackages = sspi.EnumerateSecurityPackages();
console.log(securityPackages);
const packageInfo = sspi.QuerySecurityPackageInfo("Negotiate");
console.log("packageInfo: ", packageInfo);

const { credential, tsExpiry } = sspi.AcquireCredentialsHandle("Negotiate");
console.log(credential);
const input = {
  credential,
  targetName: "kiki",
  cbMaxToken: packageInfo.cbMaxToken
};
console.log("input: ", input);
const clientSecurityContext = sspi.InitializeSecurityContext(input);
console.log("clientSecurityContext: ", clientSecurityContext);
console.log(printHexDump(clientSecurityContext.SecBufferDesc.buffers[0]));
const serverSecurityContext = sspi.AcceptSecurityContext({
  credential,
  clientSecurityContext
});
console.log("serverSecurityContext: ", serverSecurityContext);
console.log(printHexDump(serverSecurityContext.SecBufferDesc.buffers[0]));
const input2 = {
  credential,
  targetName: "kiki",
  cbMaxToken: packageInfo.cbMaxToken,
  serverSecurityContext,
  clientContextHandle: clientSecurityContext.clientContextHandle
};
console.log("input2: ", input2);
const clientSecurityContext2 = sspi.InitializeSecurityContext(input2);
console.log("clientSecurityContext2: ", clientSecurityContext2);
console.log(printHexDump(clientSecurityContext2.SecBufferDesc.buffers[0]));

const serverSecurityContext2 = sspi.AcceptSecurityContext({
  credential,
  clientSecurityContext: clientSecurityContext2,
  serverContextHandle: serverSecurityContext.serverContextHandle
});
console.log("serverSecurityContext2: ", serverSecurityContext2);
console.log(printHexDump(serverSecurityContext2.SecBufferDesc.buffers[0]));
sspi.ImpersonateSecurityContext(serverSecurityContext.serverContextHandle);
console.log("impersonate security context ok");
const username = sspi.GetUserName();
console.log('username: ', username);

const displayName = sspi.GetUserNameEx("NameDisplay");
console.log('displayName: ', displayName);

const sidObject = sspi.LookupAccountName(username);
console.log('sidObject: ', sidObject);

const userToken = sspi.OpenThreadToken();
console.log('userToken: ', userToken);

const userGroups = sspi.GetTokenInformation(userToken, 'TokenGroups');
console.log('userGroups: ', userGroups);

sspi.CloseHandle(userToken);
console.log("CloseHandle ok");

sspi.RevertSecurityContext(serverSecurityContext.serverContextHandle);
console.log("revert security context ok");
const username2 = sspi.GetUserName();
console.log('username2: ', username2);

const attributes = sspi.QueryCredentialsAttributes(credential, "SECPKG_CRED_ATTR_NAMES");
console.log('attributes: ', attributes);

const names = sspi.QueryContextAttributes(serverSecurityContext.serverContextHandle, "SECPKG_ATTR_NAMES");
console.log('names: ', names);

const accessToken = sspi.QuerySecurityContextToken(serverSecurityContext.serverContextHandle);
console.log('accessToken: ', accessToken);

const groups = sspi.GetTokenInformation(accessToken, 'TokenGroups');
console.log('groups: ', groups);

sspi.CloseHandle(accessToken);
console.log("CloseHandle ok");

sspi.DeleteSecurityContext(serverSecurityContext.serverContextHandle);
console.log("DeleteSecurityContext ok");
sspi.DeleteSecurityContext(clientSecurityContext.clientContextHandle);
console.log("DeleteSecurityContext ok");


sspi.FreeCredentialsHandle(credential);
console.log('free credentials ok');
