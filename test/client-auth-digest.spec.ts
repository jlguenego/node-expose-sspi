import assert from 'assert';
import express from 'express';
import auth from 'http-auth';
import dbg from 'debug';
import { sso } from '../src';
import { md5 } from '../src/sso/client/misc';
import { TestServer } from './lib/TestServer';

const debug = dbg('node-expose-sspi:test');

const users = { jlouis: 'toto' };

const app = express();
const digest = auth.digest(
  {
    realm: 'myrealm',
  },
  (username, callback) => {
    if (username === 'jlouis') {
      callback(md5('jlouis:myrealm:toto'));
    } else {
      callback();
    }
  }
);

app.use((req, res, next) => {
  debug('req.url', req.url);
  debug('req.headers', req.headers);
  next();
});

app.use((req, res, next) => {
  digest.check((_req, _res) => {
    next();
  })(req, res);
});

app.use((req, res) => {
  res.json({
    auth: req.auth,
  });
});
const server = new TestServer(app);

describe('Client Authentication Digest Test', () => {
  it('should test client with Digest Authentication', async function () {
    this.timeout(15000);
    await server.start();

    try {
      debug('start client');
      const client = new sso.Client();
      client.setCredentials('', 'jlouis', users.jlouis);
      const response = await client.fetch('http://localhost:3000');
      assert.strictEqual(response.status, 200);
    } finally {
      await server.stop();
    }
  });
});
