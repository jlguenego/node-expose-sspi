import { Request, RequestHandler } from "express";
import { SSO } from "./src/createSSO";

declare global {
  namespace Express {
    interface Request {
      /**
       * SSO object provided by ssoAuth middleware.
       *
       * @type {*}
       * @memberof Request
       */
      sso: SSO;
    }
  }
}


