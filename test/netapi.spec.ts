import { netapi, UserInfo1 } from '../src';
import a from 'assert';
const assert = a.strict;

describe('NETAPI Unit Test', function () {
  it('should test NetUserAdd', function () {
    const serverName = "toto";
    const levelData = 2;
    const userInfo: UserInfo1 = { name: 'tetedemule', password: 'Toto123!' };
    try {
      netapi.NetUserAdd(serverName, levelData, userInfo);
    } catch (err) {
      assert.fail(err);
    }
  });

});
