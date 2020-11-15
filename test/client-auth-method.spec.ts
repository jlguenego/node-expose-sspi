import assert from 'assert';
import http from 'http';
import express from 'express';
import basicAuth from 'express-basic-auth';
import dbg from 'debug';
import { sso } from '../src';

const debug = dbg('node-expose-sspi:test');

class Server {
  app: express.Express;
  server!: http.Server;
  constructor(private port = 3000, method = 'Basic') {
    this.app = express();
    this.app.use(
      basicAuth({
        users: { jlg: 'mypasswd' },
        challenge: true,
        realm: 'my nice realm',
      })
    );
    this.app.use((req, res) => {
      res.json({
        hello: 'world',
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

describe('Client Authentication Method Unit Test', function () {
  it('should test client with Basic Authentication', async function () {
    this.timeout(15000);
    const server = new Server();
    await server.start();

    debug('start client');
    const client = new sso.Client();
    client.setCredentials('', 'jlg', 'mypasswd');
    const response = await client.fetch('http://localhost:3000');
    await server.stop();
    assert.strictEqual(response.status, 200);
  });
});
