const express = require('express');
const { sso } = require('node-expose-sspi');
const assert = require('assert').strict;
const debug = require('debug')('node-expose-sspi:test');

describe('ClientServer', function() {
  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should return the right json', async function() {
      this.timeout(15000);
      debug('start');
      // await sso.init();
      debug('init completed');
      const app = express();
      app.use(sso.auth({ useActiveDirectory: false }));
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
        increment() {
          this.clientsNbr++;
        },
        decrement() {
          this.clientsNbr--;
          console.log('decrement i=%d', this.i);
          console.log('decrement clientsNbr=%d', this.clientsNbr);
          if (this.clientsNbr === 0 && this.i >= TIMES - 1) {
            debug('about to close');
            server.close(() => console.log('server closed'));
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
    });
  }
});
