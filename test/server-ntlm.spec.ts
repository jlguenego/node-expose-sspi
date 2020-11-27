import assert from 'assert';
import dbg from 'debug';
import express from 'express';
import { sso } from '../src';
import { TestServer } from './lib/TestServer';

const debug = dbg('node-expose-sspi:test');

const server = new TestServer();
const app = express();
app.use(sso.auth({ forceNTLM: true }));
app.use((req, res) => {
  res.json({
    auth: req.sso,
  });
});
server.app = app;

describe('forceNTLM Test', () => {
  it('should test forceNTLM', async function () {
    this.timeout(15000);
    await server.start();

    try {
      debug('start client');
      const client = new sso.Client();
      const response = await client.fetch('http://localhost:3000');
      assert.strictEqual(response.status, 200);
    } finally {
      await server.stop();
    }
  });
});
