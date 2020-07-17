import express from 'express';
import { Server } from 'http';
import os from 'os';
import { sso, netapi, UserInfo1 } from '../src';
import { strict as assert } from 'assert';
import dbg from 'debug';
const debug = dbg('node-expose-sspi:test');

class MyServer {
  app = express();
  server: Server;
  constructor() {
    this.app.use(sso.auth());
    this.app.use((req, res) => {
      res.json({
        sso: req.sso,
      });
    });
  }

  start(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.server = this.app.listen(3000, () => resolve());
    });
  }
  stop(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.server.close(() => resolve());
    });
  }
}

async function isLocalhostSPN(): Promise<boolean> {
  const spn = new sso.SPN();
  const list = await spn.getListAll();
  const spns = list
    .map((record) => record.spn)
    .reduce((acc, n) => acc.concat(n));
  const result = spns.filter((s) => s === 'HTTP/localhost').length > 0;
  return result;
}

describe('ClientServer', function () {
  it('should test SEC_E_NO_AUTHENTICATING_AUTHORITY', async function () {
    const server = new MyServer();
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
      assert.match(e.message, /0x80090311/);
    } finally {
      await server.stop();
    }
  });

  if (sso.isActiveDirectoryReachable()) {
    it('should test SEC_E_LOGON_DENIED', async function () {
      const server = new MyServer();
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
        assert.match(e.message, /0x8009030c/);
      } finally {
        await server.stop();
      }
    });

    it('should test kerberos with good login', async function () {
      this.timeout(8000);
      if (!(await isLocalhostSPN())) {
        console.log(
          'to unit test kerberos, you should add HTTP/localhost in the SPN'
        );
        return;
      }
      const server = new MyServer();
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
      const username = 'test345';
      try {
        try {
          netapi.NetUserDel(undefined, username);
        } catch (e) {}
        netapi.NetUserAdd(undefined, 1, {
          name: username,
          password: 'toto123!',
        } as UserInfo1);
        const server = new MyServer();
        await server.start();

        const client = new sso.Client();
        client.setCredentials(os.hostname(), username, 'nonono');
        const response = await client.fetch('http://localhost:3000');
        const body = await response.text();
        await server.stop();
        assert.equal(body.startsWith('SEC_E_LOGON_DENIED'), true);
        assert.equal(response.status, 401);
      } catch (e) {
        assert.fail(e);
      } finally {
        try {
          netapi.NetUserDel(undefined, username);
        } catch (e) {}
      }
    });
  }

  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should return the right json', async function () {
      this.timeout(15000);
      debug('start');
      const app = express();
      app.use(
        sso.auth({
          useOwner: true,
          useActiveDirectory: true,
          useCookies: false,
        })
      );
      app.use((req, res) => {
        res.json({
          sso: req.sso,
        });
      });

      const server = app.listen(3000);
      debug('server started');

      const TIMES = 10;
      const DELAY = 0;

      const state = {
        i: 0,
        clientsNbr: 0,
        resolve: (): void => {},
        increment(): void {
          this.clientsNbr++;
        },
        decrement(): void {
          this.clientsNbr--;
          if (this.clientsNbr === 0 && this.i >= TIMES - 1) {
            debug('about to close');
            server.close(() => {
              debug('server closed');
              if (this.resolve) {
                this.resolve();
              }
            });
          }
        },
      };

      async function simulateClient(i: number): Promise<void> {
        try {
          debug('start client', i);
          state.increment();
          const response = await new sso.Client().fetch(
            'http://localhost:3000'
          );
          const json = await response.json();
          state.decrement();
          assert(json.sso.user, 'json.sso.user should be truthy');
          assert(json.sso.owner, 'json.sso.owner should be truthy');
          assert.equal(json.sso.method, 'NTLM');
          debug('end client', i);
        } catch (e) {
          console.error(e);
          throw e;
        }
      }

      function clean(): Promise<void> {
        return new Promise((resolve) => {
          state.resolve = resolve;
        });
      }

      try {
        for (state.i = 0; state.i < TIMES; state.i++) {
          simulateClient(state.i);
          await sso.sleep(DELAY);
        }
        await clean();
        debug('finished');
      } catch (e) {
        console.error(e);
        throw e;
      }
    });
  }
});
