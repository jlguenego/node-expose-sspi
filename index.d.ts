import { Request, RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      /**
       * SSO object provided by ssoAuth middleware.
       *
       * @type {*}
       * @memberof Request
       */
      sso: any;
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
