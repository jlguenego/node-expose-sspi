const sspi = require('bindings')('sspi');

const result = sspi.hello();
console.log(result);
const result2 = sspi.hello2();
console.log(result2);
