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
      sso: SSO.Object;
    }

    namespace SSO {
      interface Object {
        user: User;
        owner: User;
      }
  
      interface User {
        name: string;
        sid: string;
        displayName: string;
        domain: string;
        groups: string[];
      }
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
