import assert from 'assert';
import http from 'http';
import express from 'express';
import dbg from 'debug';
import { sso } from '../src';

const debug = dbg('node-expose-sspi:test');

class Server {
  app: express.Express;
  server!: http.Server;
  constructor(private port = 3000) {
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
    this.app = app;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.port, () => {
        resolve();
      });
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.server.close(() => {
        resolve();
      });
    });
  }
}

describe('Client Post Test', () => {
  it('should test client with Post Authentication', async function () {
    this.timeout(15000);
    const server = new Server();
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
      const json = await response.json();
      assert.strictEqual(json.toto, 123);
      assert.strictEqual(json.id, 'a123');
      assert(json.sso);
    } finally {
      await server.stop();
    }
  });
});
