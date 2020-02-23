import { SSOObject } from './SSOObject';

declare global {
  namespace Express {
    interface Request {
      sso: SSOObject;
    }
  }
}


