import { Request, RequestHandler } from "express";
import { SSO } from "./src/createSSO";
import { sso } from "./src/index";

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

if (require("os").platform() !== "win32") {
  throw new Error(
    "The module 'node-expose-sspi' can only work on Microsoft Windows platform."
  );
}

import sspi = require("./lib/sspi");

export const nodeExposeSspi = {
  sspi,
  sso
};
