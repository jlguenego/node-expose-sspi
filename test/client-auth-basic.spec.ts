import assert from 'assert';
import http from 'http';
import express from 'express';
import basicAuth from 'express-basic-auth';
import dbg from 'debug';
import { sso } from '../src';

const debug = dbg('node-expose-sspi:test');

declare global {
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

class Server {
  app: express.Express;
  server!: http.Server;
  constructor(private port = 3000, method = 'Basic') {
    this.app = express();
    this.app.use((req, res, next) => {
      debug('req.url', req.url);
      debug('req.headers', req.headers);
      next();
    });
    this.app.use(
      basicAuth({
        users,
        challenge: true,
        // realm: 'my nice realm',
      })
    );
    this.app.use((req, res) => {
      res.json({
        auth: req.auth,
      });
    });
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

describe('Client Authentication Basic Test', function () {
  it('should test client with Basic Authentication', async function () {
    this.timeout(15000);
    const server = new Server();
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
