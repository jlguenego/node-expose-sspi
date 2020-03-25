const { sspi } = require('node-expose-sspi');
const assert = require('assert').strict;

describe('Sysinfo Unit Test', function() {
  it('should test CoUninitialize', function() {
    const str = sspi.GetComputerNameEx('ComputerNameDnsDomain');
    assert(str);
  });
});
