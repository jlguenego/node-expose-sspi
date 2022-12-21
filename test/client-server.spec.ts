import express, { Request, Response, NextFunction } from 'express';
import os from 'os';
import { sso, netapi, UserInfo1, SSOObject } from '../src';
import { strict as assert } from 'assert';
import dbg from 'debug';
import { TestServer } from './lib/TestServer';
const debug = dbg('node-expose-sspi:test');

const app = express();
app.use(sso.auth());
app.use((req, res) => {
  res.json({
    sso: req.sso,
  });
});

// to avoid the default error handler do some console.error stuff.
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (
    err: { statusCode: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(err.statusCode).end();
  }
);
const server = new TestServer(app);

async function isLocalhostSPN(): Promise<boolean> {
  const spn = new sso.SPN();
  const list = await spn.getListAll();
  const spns = list
    .map((record) => record.spn)
    .reduce((acc, n) => acc.concat(n));
  const result = spns.filter((s) => s === 'HTTP/localhost').length > 0;
  return result;
}

describe('ClientServer', () => {
  it('should test SEC_E_NO_AUTHENTICATING_AUTHORITY', async function () {
    this.timeout(15000);
    try {
      await server.start();

      const client = new sso.Client();
      // os.hostname() is not the domain, but the local machine.
      // so because no KDC is on the localhost,
      // this will lead to 0x80090311 (SEC_E_NO_AUTHENTICATING_AUTHORITY)
      client.setCredentials(os.hostname(), 'd', '');
      client.setSSP('Kerberos');
      await client.fetch('http://localhost:3000');
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }
      assert.match(e.message, /0x80090311/);
    } finally {
      await server.stop();
    }
  });

  if (sso.isActiveDirectoryReachable()) {
    it('should test SEC_E_LOGON_DENIED', async function () {
      this.timeout(15000);
      try {
        await server.start();

        const client = new sso.Client();
        client.setCredentials(
          sso.getDefaultDomain(),
          'doesnotexist',
          'neither'
        );
        client.setSSP('Kerberos');
        await client.fetch('http://localhost:3000');
      } catch (e) {
        if (!(e instanceof Error)) {
          throw e;
        }
        assert.match(e.message, /0x8009030c/);
      } finally {
        await server.stop();
      }
    });

    it('should test kerberos with good login', async function () {
      this.timeout(15000);
      if (!(await isLocalhostSPN())) {
        console.log(
          'to unit test kerberos, you should add HTTP/localhost in the SPN'
        );
        return;
      }
      try {
        await server.start();

        const client = new sso.Client();
        client.setSSP('Kerberos');
        const response = await client.fetch('http://localhost:3000');
        const json = await response.json();
        assert(json);
      } catch (e) {
        console.log('e: ', e);
        assert.fail('should not reject error');
      } finally {
        await server.stop();
      }
    });
  }

  if (sso.hasAdminPrivileges()) {
    it('should return bad login', async function () {
      this.timeout(15000);
      const username = 'test345';
      try {
        try {
          netapi.NetUserDel(undefined, username);
        } catch (e) {
          debug('no account to delete');
        }
        netapi.NetUserAdd(undefined, 1, {
          name: username,
          password: 'toto123!',
        } as UserInfo1);
        await server.start();

        const client = new sso.Client();
        client.setCredentials(os.hostname(), username, 'nonono');
        const response = await client.fetch('http://localhost:3000');
        assert.equal(response.status, 401);
      } catch (e) {
        assert.fail(e as Error);
      } finally {
        await server.stop();
        try {
          netapi.NetUserDel(undefined, username);
        } catch (e) {
          debug('no account to delete');
        }
      }
    });
  }

  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should return the right json', async function () {
      this.timeout(30000);
      debug('start');
      const myApp = express();
      myApp.use(
        sso.auth({
          useOwner: true,
          useActiveDirectory: true,
        })
      );
      myApp.use((req, res) => {
        res.json({
          sso: req.sso,
        });
      });

      const myServer = new TestServer(myApp);
      try {
        await myServer.start();

        const client = new sso.Client();
        const url = 'http://localhost:3000';

        const TIMES = 10;
        const DELAY = 10;

        const array = new Array(TIMES).fill(0).map((n, i) => {
          return async () => {
            debug('start', i);
            await sso.sleep(DELAY * i);
            debug('fetch url', i);
            const response = await client.fetch(url);
            debug('response', i);
            const json = (await response.json()) as { sso: SSOObject };
            assert(json.sso.user, 'json.sso.user should be truthy');
            assert(json.sso.owner, 'json.sso.owner should be truthy');
            assert.equal(json.sso.method, 'NTLM');
            debug('end client', i);
          };
        });
        await Promise.all(array.map((f) => f()));
        debug('finished');
      } finally {
        debug('about to stop server');
        await myServer.stop();
        debug('server stopped');
      }
    });
  }
});
