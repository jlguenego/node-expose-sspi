import { IncomingMessage, ServerResponse } from 'http';
import { CookieToken, SSOMethod } from '../interfaces';
import { CtxtHandle } from '../..';

export abstract class ServerContextHandleManager {
  req: IncomingMessage;
  res: ServerResponse;

  getCookieToken(req: IncomingMessage, res: ServerResponse): CookieToken {
    this.req = req;
    this.res = res;
    return undefined;
  }

  abstract waitForReleased(cookieToken: CookieToken): Promise<void>;

  abstract getMethod(cookieToken: CookieToken): SSOMethod;

  abstract setMethod(ssoMethod: SSOMethod, cookieToken: CookieToken): void;

  abstract getHandle(cookieToken: CookieToken): CtxtHandle;

  abstract setHandle(contextHandle: CtxtHandle, cookieToken: CookieToken): void;

  /**
   * At the end of the negotiation this method MUST be called to release the context handle.
   *
   * @abstract
   * @param {CookieToken} cookieToken
   * @memberof ServerContextHandleManager
   */
  abstract release(cookieToken: CookieToken): void;
}
