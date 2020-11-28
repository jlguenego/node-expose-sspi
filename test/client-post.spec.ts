import assert from 'assert';
import express from 'express';
import dbg from 'debug';
import { sso } from '../src';
import { TestServer } from './lib/TestServer';

const debug = dbg('node-expose-sspi:test');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  debug('req.url', req.url);
  debug('req.headers', req.headers);
  next();
});
app.use(sso.auth());
app.post('/api/article', (req, res) => {
  const result = { ...req.body };
  result.id = 'a123';
  result.sso = req.sso;
  res.json(result);
});
app.use((req, res) => {
  res.json({
    auth: req.auth,
  });
});
const server = new TestServer(app);

describe('Client Post Test', () => {
  it('should test client with Post Authentication', async function () {
    this.timeout(15000);
    await server.start();

    try {
      debug('start client');
      const client = new sso.Client();
      const response = await client.fetch('http://localhost:3000/api/article', {
        method: 'POST',
        body: JSON.stringify({ toto: 123 }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = (await response.json()) as {
        toto: number;
        id: string;
        sso: unknown;
      };
      assert.strictEqual(json.toto, 123);
      assert.strictEqual(json.id, 'a123');
      assert(json.sso);
    } finally {
      await server.stop();
    }
  });
});
