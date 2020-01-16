const addon = require('bindings')('addon');

const result = addon.hello();
console.log(result);
