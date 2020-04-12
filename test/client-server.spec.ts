import express from 'express';
import { sso } from '../src';
import a from 'assert';
const assert = a.strict;
import dbg from 'debug';
const debug = dbg('node-expose-sspi:test');

describe('ClientServer', function () {
  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should return the right json', async function () {
      this.timeout(15000);
      debug('start');
      await sso.init();
      debug('init completed');
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

      const TIMES = 3;
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
          assert(false);
        }
      }

      for (state.i = 0; state.i < TIMES; state.i++) {
        simulateClient(state.i);
        await sso.sleep(DELAY);
      }

      function clean(): Promise<void> {
        return new Promise((resolve) => {
          state.resolve = resolve;
        });
      }

      await clean();
    });
  }
});
