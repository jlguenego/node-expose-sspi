import assert from 'assert';
import os from 'os';
import { sso, sysinfo, netapi } from '../src';
import dbg from 'debug';

const debug = dbg('node-expose-sspi:test');

describe('SSO Unit Test', function () {
  it('should test getDefaultDomain', function () {
    const defaultDomain = sso.getDefaultDomain();
    const domain = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
    if (domain.length === 0) {
      assert(sso.isOnDomain() === false);
      const hostname = os.hostname();
      assert(
        defaultDomain.toLocaleUpperCase() === hostname.toLocaleUpperCase()
      );
      return;
    }
    assert(sso.isOnDomain() === true);
    assert(domain.length > 0);
  });

  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should test sso.init()', async function () {
      this.timeout(15000);
      sso.init();
      await sso.getUsers();
      await sso.sleep(5000);
    });

    it('should test sso.getUser()', async function () {
      this.timeout(15000);
      await sso.getUser(`sAMAccountName=${os.userInfo().username}`);
    });
  }

  it('should test sso.mutex', function () {
    this.timeout(15000);
    const mutex = new sso.Mutex();
    const sleep = sso.sleep;

    async function doSomething(label: number): Promise<void> {
      const release = await mutex.acquire();
      debug(label, 'start');
      for (let i = 0; i < 10; i++) {
        await sleep(Math.floor(10 * Math.random()));
        debug(label, 'sleep');
      }
      debug(label, 'end');
      release();
    }

    for (let i = 0; i < 10; i++) {
      doSomething(i);
    }
  });

  if (sso.hasAdminPrivileges()) {
    it('should test connect with a local account', async function () {
      try {
        netapi.NetUserAdd(undefined, 1, {
          name: 'test123',
          password: 'toto123!',
        });
        const userCredentials = {
          domain: os.hostname(),
          user: 'titi',
          password: 'toto',
        };
        const mySSO = await sso.connect(userCredentials);
        assert(mySSO);
        netapi.NetUserDel(undefined, 'test123');
      } catch (error) {
        assert(error);
      }
    });
  }

  it('should test connect with bad login', async function () {
    try {
      // in order to test that it is working,
      // create a local account titi with password toto
      const userCredentials = {
        domain: os.hostname(),
        user: 'neverexist',
        password: 'toto',
      };
      await sso.connect(userCredentials);
      assert.fail('connect did not thrown any error.');
    } catch (error) {
      assert(error instanceof Error);
      assert.equal(error.message, 'Sorry mate, wrong login/password.');
    }
  });
});
