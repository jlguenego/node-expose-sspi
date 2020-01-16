const sspi = require('bindings')('sspi');

const result = sspi.hello();
console.log(result);
