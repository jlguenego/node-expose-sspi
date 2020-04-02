const express = require('express');
const { sso } = require('node-expose-sspi');
const assert = require('assert').strict;
const debug = require('debug')('node-expose-sspi:test');
const util = require('util');

describe('ClientServer', function() {
  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should return the right json', async function() {
      this.timeout(15000);
      debug('start');
      await sso.init();
      debug('init completed');
      const app = express();
      app.use(sso.auth({ useActiveDirectory: true }));
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
        resolve: undefined,
        increment() {
          this.clientsNbr++;
        },
        decrement() {
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

      async function simulateClient(i) {
        try {
          debug('start client', i);
          const { fetch } = sso.client;
          state.increment();
          const response = await fetch('http://localhost:3000');
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

      function clean() {
        return new Promise((resolve, reject) => {
          state.resolve = resolve;
        });
      }

      await clean();
    });
  }
});
