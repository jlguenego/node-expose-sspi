import assert from 'assert';
import express from 'express';
import basicAuth from 'express-basic-auth';
import dbg from 'debug';
import { sso } from '../src';
import { TestServer } from './lib/TestServer';

const debug = dbg('node-expose-sspi:test');

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      auth: {
        user: string;
        password: string;
      };
    }
  }
}

const users = { jlouis: 'toto' };

const app = express();
app.use((req, res, next) => {
  debug('req.url', req.url);
  debug('req.headers', req.headers);
  next();
});
app.use(
  basicAuth({
    users,
    challenge: true,
    // realm: 'my nice realm',
  })
);
app.use((req, res) => {
  res.json({
    auth: req.auth,
  });
});
const server = new TestServer(app);

describe('Client Authentication Basic Test', () => {
  it('should test client with Basic Authentication', async function () {
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
