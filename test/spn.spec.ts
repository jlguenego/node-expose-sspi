import { sso } from '../src';
import { strict as assert } from 'assert';

describe('SPN Unit Test', function () {
  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should test SPN', async function () {
      this.timeout(15000);
      const spn = new sso.SPN();
      const list = await spn.getListAll();
      console.log('list: ', list);
      assert(list instanceof Array);
    });
  }
});
