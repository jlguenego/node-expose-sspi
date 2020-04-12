import { sysinfo } from '../src';
import a from 'assert';
const assert = a.strict;

describe('SYSINFO Unit Test', function () {
  it('should test GetComputerNameEx', function () {
    const str = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
    assert(typeof str === 'string');
  });
});
