const sspi = require('..');

const result = sspi.hello();
console.log(result);
const result2 = sspi.EnumerateSecurityPackages();

console.log(result2);
