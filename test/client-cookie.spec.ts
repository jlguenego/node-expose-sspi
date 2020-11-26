import assert from 'assert';
import express, { Express } from 'express';
import dbg from 'debug';
import { Server } from 'http';

import { sso } from '../src';

const debug = dbg('node-expose-sspi:test');

class MyServer {
  app: Express;
  server!: Server;
  constructor() {
    const app = express();
    app.use(sso.auth({ useActiveDirectory: true, useCookies: true }));
    app.use((req, res) => {
      res.json({
        cookie: req.headers.cookie,
        sso: req.sso,
      });
    });
    this.app = app;
  }

  start(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.server = this.app.listen(3000, () => resolve());
    });
  }
  stop(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.server.close(() => resolve());
    });
  }
}

describe('COOKIE Unit Test', async () => {
  it('should test client with cookie', async function () {
    this.timeout(15000);
    const server = new MyServer();

    try {
      await server.start();
      debug('server started');

      const client = new sso.Client();
      const response = await client.fetch('http://localhost:3000');
      const json = await response.json();
      assert.strictEqual(json.sso.method, 'NTLM');
      debug('cookie', json.cookie);
    } catch (e) {
      assert.fail(e);
    } finally {
      await server.stop();
    }
  });
});
