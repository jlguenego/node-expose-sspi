import http from 'http';
import express from 'express';
import { sso } from '../..';

export class TestServer {
  app: express.Express;
  server!: http.Server;
  constructor(private port = 3000) {
    const app = express();
    app.use(sso.auth());
    app.use((req, res) => {
      res.json({
        auth: req.sso,
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
