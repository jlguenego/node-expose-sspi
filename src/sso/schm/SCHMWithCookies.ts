import { IncomingMessage, ServerResponse } from 'http';
import dbg from 'debug';

import { ServerContextHandleManager } from './ServerContextHandleManager';
import { parseCookies } from '../cookies';
import { CtxtHandle } from '../..';
import { CookieToken, SSOMethod } from '../interfaces';

const debug = dbg('node-expose-sspi:schManager');

const COOKIE_KEY = 'NEGOTIATE_ID';
const COOKIE_PREFIX_VALUE = 'NEGOTIATE_';

interface ContextInfo {
  serverContextHandle?: CtxtHandle;
  method?: SSOMethod;
}

export class SCHMWithCookies extends ServerContextHandleManager {
  private sessionMap = new Map<string, ContextInfo>();

  getCookieToken(req: IncomingMessage, res: ServerResponse): CookieToken {
    super.getCookieToken(req, res);
    debug('initCookie');
    let cookieToken = parseCookies(req)[COOKIE_KEY];
    if (!cookieToken) {
      // generate new cookie
      debug('cookie not found, so generating one');
      cookieToken = COOKIE_PREFIX_VALUE + Math.floor(1e10 * Math.random());
      // create a session cookie (without expiration specified)
      res.setHeader('Set-Cookie', `${COOKIE_KEY}=${cookieToken}; Max-Age=999999999`);
    }
    if (!this.sessionMap.has(cookieToken)) {
      this.sessionMap.set(cookieToken, {});
    }
    return cookieToken;
  }

  waitForReleased(cookieToken: CookieToken): Promise<void> {
    debug('wait for release with cookie', cookieToken);
    return Promise.resolve();
  }

  getMethod(cookieToken: CookieToken): SSOMethod {
    const contextInfo = this.sessionMap.get(cookieToken);
    return contextInfo.method;
  }

  setMethod(ssoMethod: SSOMethod, cookieToken: CookieToken): void {
    const contextInfo = this.sessionMap.get(cookieToken);
    contextInfo.method = ssoMethod;
  }

  getHandle(cookieToken: CookieToken): CtxtHandle {
    debug('cookieToken: ', cookieToken);
    const contextInfo = this.sessionMap.get(cookieToken);
    return contextInfo.serverContextHandle;
  }

  setHandle(contextHandle: CtxtHandle, cookieToken: CookieToken): void {
    const contextInfo = this.sessionMap.get(cookieToken);
    contextInfo.serverContextHandle = contextHandle;
  }

  /**
   * At the end of the negotiation this method MUST be called to release the context handle.
   *
   * @abstract
   * @param {CookieToken} cookieToken
   * @memberof ServerContextHandleManager
   */
  release(cookieToken: CookieToken): void {
    this.sessionMap.delete(cookieToken);
  }
}
