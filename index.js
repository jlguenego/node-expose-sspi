const sspi = require('bindings')('sspi');

const result = sspi.hello();
console.log(result);
const result2 = sspi.EnumerateSecurityPackages();

console.log(result2);
