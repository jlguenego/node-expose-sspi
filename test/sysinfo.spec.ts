import { sysinfo } from '../src';
import { strict as assert } from 'assert';

describe('SYSINFO Unit Test', function () {
  it('should test GetComputerNameEx', function () {
    const str = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
    assert(typeof str === 'string');
  });
});
