import assert from 'assert';
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';

import { sso, SSOObject } from '../src';
import { TestServer } from './lib/TestServer';

const app = express();
app.use(
  session({
    name: 'express-sso-session',
    resave: false,
    saveUninitialized: true,
    secret: 'voila...',
  })
);
app.use(sso.auth({ useSession: true }));
app.use((req, res) => {
  res.json({
    sso: req?.session?.sso,
  });
});

// to avoid the default error handler do some console.error stuff.
app.use(
  (
    err: { statusCode: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(err.statusCode).end();
  }
);
const server = new TestServer(app);

describe('Session', () => {
  it('should test session is used', async function () {
    this.timeout(15000);
    try {
      await server.start();

      const client = new sso.Client();
      await client.fetch('http://localhost:3000');
      const response = await client.fetch('http://localhost:3000');
      const json = (await response.json()) as { sso: SSOObject };
      assert.strictEqual(json.sso.cached, true);
    } catch (e) {
      assert.fail(e as Error);
    } finally {
      await server.stop();
    }
  });
});
