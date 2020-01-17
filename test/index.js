const sspi = require('..');

const result = sspi.hello();
console.log(result);
const result2 = sspi.EnumerateSecurityPackages();
const result3 = sspi.AcquireCredentialsHandle();

console.log(result2);
console.log(result3);
