const { sysinfo } = require('node-expose-sspi');
const assert = require('assert').strict;

describe('Sysinfo Unit Test', function() {
  it('should test GetComputerNameEx', function() {
    const str = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
    assert(typeof str === 'string');
  });
});
