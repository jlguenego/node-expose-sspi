if (require('os').platform() !== 'win32') {
  throw new Error(
    "The module 'node-expose-sspi' can only work on Microsoft Windows platform."
  );
}

const sspi = require('./lib/sspi');
const { sso, adsi } = require('./dist/index');

module.exports = {
  sspi,
  sso,
  adsi,
};
