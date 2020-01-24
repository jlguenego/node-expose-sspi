if (require('os').platform() !== "win32") {
    throw new Error("The module 'node-expose-sspi' can only work on Microsoft Windows platform.");
}

const sspi = require('bindings')('sspi');

module.exports = sspi;
