import { netapi, UserInfo1, sso } from '../src';
import { strict as assert } from 'assert';

describe('NETAPI Unit Test', () => {
  if (sso.hasAdminPrivileges()) {
    it('should test NetUserAdd', () => {
      const levelData = 1;
      const userInfo: UserInfo1 = { name: 'tetedemule', password: 'Toto123!' };
      try {
        netapi.NetUserAdd(undefined, levelData, userInfo);
      } catch (err) {
        assert.fail(err as Error);
      }
    });

    it('should test NetUserDel', () => {
      const username = 'tetedemule';
      try {
        netapi.NetUserDel(undefined, username);
      } catch (err) {
        assert.fail(err as Error);
      }
    });
  }
});
