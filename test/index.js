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
  targetName: "kiki"
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
