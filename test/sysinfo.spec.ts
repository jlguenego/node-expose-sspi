import { sysinfo } from '../src';
import { strict as assert } from 'assert';

describe('SYSINFO Unit Test', () => {
  it('should test GetComputerNameEx', () => {
    const str = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
    assert(typeof str === 'string');
  });
});
