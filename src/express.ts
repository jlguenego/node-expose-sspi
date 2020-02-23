import { SSO } from './SSO';

declare global {
  namespace Express {
    interface Request {
      sso: SSO;
    }
  }
}


