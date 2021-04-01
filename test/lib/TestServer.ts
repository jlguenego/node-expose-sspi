import http from 'http';
import express from 'express';

export class TestServer {
  server!: http.Server;
  constructor(private app: express.Express, private port = 3000) {}

  start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server = this.app.listen(this.port, () => {
        resolve();
      });
    });
  }

  stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server.close(() => {
        resolve();
      });
    });
  }
}
