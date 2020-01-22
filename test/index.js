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
const credential = sspi.AcquireCredentialsHandle("Negotiate");
console.log(credential);
const input = {
  credential,
  targetName: "kiki"
};
console.log('input: ', input);
const clientSecurityContext = sspi.InitializeSecurityContext(input);
console.log('clientSecurityContext: ', clientSecurityContext);
console.log(printHexDump(clientSecurityContext.SecBufferDesc.buffers[0]));
const serverSecurityContext = sspi.AcceptSecurityContext({
  credential,
  clientSecurityContext
});
console.log('serverSecurityContext: ', serverSecurityContext);
console.log(printHexDump(serverSecurityContext.SecBufferDesc.buffers[0]));
const input2 = {
  credential,
  targetName: "kiki",
  serverSecurityContext,
  isFirstCall: false
};
console.log('input2: ', input2);
const clientSecurityContext2 = sspi.InitializeSecurityContext(input2);
console.log('clientSecurityContext2: ', clientSecurityContext2);
console.log(printHexDump(clientSecurityContext2.SecBufferDesc.buffers[0]));