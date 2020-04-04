const assert = require('assert');
const express = require('express');
const debug = require('debug')('node-expose-sspi:test');
const { sso } = require('node-expose-sspi');

describe('COOKIE Unit Test', function() {
  it('should test client with cookie', async function() {
    this.timeout(15000);
    const app = express();
    app.use(sso.auth({ useActiveDirectory: false, useCookies: true }));
    app.use((req, res) => {
      res.json({
        cookie: req.headers.cookie,
        sso: req.sso,
      });
    });

    const server = app.listen(3000);
    debug('server started');

    debug('start client');
    const response = await new sso.Client().fetch('http://localhost:3000');
    const json = await response.json();
    assert.equal(json.sso.method, 'NTLM');
    debug('cookie', json.cookie);
    server.close();
  });
});
