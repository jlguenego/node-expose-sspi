const express = require('express');
const { sso } = require('node-expose-sspi');
const assert = require('assert').strict;

describe('ClientServer', function() {
  if (sso.isOnDomain() && sso.isActiveDirectoryReachable()) {
    it('should return the right json', async function() {
      this.timeout(15000);
      const app = express();
      await sso.init();
  
      app.use(sso.auth());
  
      app.use((req, res, next) => {
        res.json({
          sso: req.sso,
        });
      });
  
      const server = app.listen(3000);
  
      let json;
      try {
        const { fetch } = sso.client;
        const response = await fetch('http://localhost:3000');
        json = await response.json();
      } catch (e) {
        console.error(e);
      }
  
      server.close();
  
      assert(json, 'json should be truthy');
      assert(json.sso, 'json.sso should be truthy');
      assert(json.sso.user, 'json.sso.user should be truthy');
      assert(json.sso.owner, 'json.sso.owner should be truthy');
      assert.equal(json.sso.method, 'NTLM');
    });
  }
  
});
