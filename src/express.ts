import { SSO } from './SSO';

declare global {
  namespace Express {
    interface Request {
      /**
       * Contains the SSO object.
       *
       * @type {SSO}
       * @memberof Request
       */
      sso: SSO;
    }
  }
}


