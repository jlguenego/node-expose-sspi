import { Request, RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      /**
       * User authenticated
       *
       * @type {*}
       * @memberof Request
       */
      user: any;

      /**
       * Owner of the webserver process
       *
       * @type {*}
       * @memberof Request
       */
      owner: any;
    }
  }
}

declare namespace nodeExposeSspi {
  interface Options {
    [key: string]: any;
  }

  function ssoAuth(options?: nodeExposeSspi.Options): RequestHandler;
}

export = nodeExposeSspi;
