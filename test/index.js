const sspi = require("..");
const { printHexDump } = require("../misc/misc");

let counter = sspi.count();
console.log("counter: ", counter);
counter = sspi.count();
console.log("counter: ", counter);

const result = sspi.hello();
console.log(result);
const result2 = sspi.EnumerateSecurityPackages();
console.log(result2);
const credentialObject = sspi.AcquireCredentialsHandle("Negotiate");
console.log(credentialObject);
const result3 = sspi.InitializeSecurityContext({
  hCredential: credentialObject.hCredential,
  pszTargetName: "kiki"
});
console.log(result3);
console.log(result3.SecBufferDesc.buffers[0]);
console.log(printHexDump(result3.SecBufferDesc.buffers[0]));
