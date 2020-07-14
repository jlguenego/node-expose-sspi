import { netapi, UserInfo1, sso } from '../src';
import { strict as assert } from 'assert';

describe('NETAPI Unit Test', function () {
  if (sso.hasAdminPrivileges()) {
    it('should test NetUserAdd', function () {
      const serverName: string = undefined;
      const levelData = 1;
      const userInfo: UserInfo1 = { name: 'tetedemule', password: 'Toto123!' };
      try {
        netapi.NetUserAdd(serverName, levelData, userInfo);
      } catch (err) {
        assert.fail(err);
      }
    });

    it('should test NetUserDel', function () {
      const serverName: string = undefined;
      const username = 'tetedemule';
      try {
        netapi.NetUserDel(serverName, username);
      } catch (err) {
        assert.fail(err);
      }
    });
  }
});
