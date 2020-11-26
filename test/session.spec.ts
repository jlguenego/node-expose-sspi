import assert from 'assert';
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import { Server } from 'http';

import { sleep } from '../src/sso/sleep';
import { sso } from '../src';

class MyServer {
  app = express();
  server!: Server;
  constructor() {
    this.app.use(
      session({
        name: 'express-sso-session',
        resave: false,
        saveUninitialized: true,
        secret: 'voila...',
      })
    );
    this.app.use(sso.auth({ useSession: true }));
    this.app.use((req, res) => {
      res.json({
        sso: req?.session?.sso,
      });
    });

    // to avoid the default error handler do some console.error stuff.
    this.app.use(
      (
        err: { statusCode: number },
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        res.status(err.statusCode).end();
      }
    );
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

describe('Session', () => {
  it('should test session is used', async function () {
    this.timeout(15000);
    const server = new MyServer();
    try {
      await server.start();

      const client = new sso.Client();
      await client.fetch('http://localhost:3000');
      await sleep(1000);
      const response = await client.fetch('http://localhost:3000');
      const json = await response.json();
      assert.strictEqual(json.sso.cached, true);
    } catch (e) {
      assert.fail(e);
    } finally {
      await server.stop();
    }
  });
});
