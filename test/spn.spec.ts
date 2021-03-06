import { sso } from '../src';
import { strict as assert } from 'assert';

describe('SPN Unit Test', () => {
  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should test SPN', async function () {
      this.timeout(15000);
      const spn = new sso.SPN();
      const list = await spn.getListAll();
      assert(list instanceof Array);
    });
  }
});
