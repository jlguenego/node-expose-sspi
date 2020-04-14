import { CtxtHandle } from '../../lib/api';
import http from 'http';
import { parseCookies } from './cookies';
import dbg from 'debug';
import { SSOMethod } from './SSO';
import { CookieToken } from './interfaces';

const debug = dbg('node-expose-sspi:schManager');

type IPromiseFn = (value?: unknown) => void;

interface AuthItem {
  resolve: IPromiseFn;
  reject: IPromiseFn;
  timeout?: NodeJS.Timeout;
}

interface ContextInfo {
  serverContextHandle: CtxtHandle;
  method: SSOMethod;
}

const COOKIE_KEY = 'NEGOTIATE_ID';
const COOKIE_PREFIX_VALUE = 'NEGOTIATE_';

export class ServerContextHandleManager {
  private serverContextHandle: CtxtHandle;
  private queue: AuthItem[] = [];
  private authItem: AuthItem;

  private sessionMap = new Map<string, ContextInfo>();

  private method: SSOMethod;

  constructor(private delayMax = 20000) {}

  initCookie(req: http.IncomingMessage, res: http.ServerResponse): CookieToken {
    debug('initCookie');
    let cookieToken = parseCookies(req)[COOKIE_KEY];
    if (!cookieToken) {
      cookieToken = COOKIE_PREFIX_VALUE + Math.floor(1e10 * Math.random());
      // create a session cookie (without expiration specified)
      res.setHeader('Set-Cookie', COOKIE_KEY + '=' + cookieToken);
    }
    if (!this.sessionMap.has(cookieToken)) {
      this.sessionMap.set(cookieToken, {
        method: undefined,
        serverContextHandle: undefined,
      } as ContextInfo);
    }
    return cookieToken;
  }

  waitForReleased(cookieToken: CookieToken): Promise<void> {
    if (cookieToken) {
      return Promise.resolve();
    }
    debug('waitForReleased: start');
    return new Promise((resolve, reject) => {
      debug('waitForReleased: start promise');
      // if nobody else is currently authenticating then go now.
      const authItem = { resolve, reject };
      const timeout = setTimeout(() => {
        this.tooLate(authItem);
      }, this.delayMax);
      if (this.authItem === undefined) {
        debug(
          'waitForReleased: no other authentication ongoing: we can start now.'
        );
        this.authItem = { resolve, reject, timeout };
        return this.authItem.resolve();
      }

      debug(
        'someone is currently authenticating, go in the queue and wait for your turn.'
      );
      this.queue.push({ resolve, reject, timeout });
      debug('queue length', this.queue.length);
    });
  }

  set(serverContextHandle: CtxtHandle, cookieToken: CookieToken): void {
    if (cookieToken) {
      const contextInfo = this.sessionMap.get(cookieToken);
      contextInfo.serverContextHandle = serverContextHandle;
      return;
    }
    this.serverContextHandle = serverContextHandle;
  }

  getServerContextHandle(cookieToken: CookieToken): CtxtHandle {
    if (cookieToken) {
      const contextInfo = this.sessionMap.get(cookieToken);
      return contextInfo.serverContextHandle;
    }
    return this.serverContextHandle;
  }

  release(cookieToken?: CookieToken): void {
    if (cookieToken) {
      this.sessionMap.delete(cookieToken);
      return;
    }

    if (this.authItem) {
      clearTimeout(this.authItem.timeout);
    }
    this.serverContextHandle = undefined;
    this.authItem = undefined;
    if (this.queue.length > 0) {
      // it means another client B was waiting for authenticating.
      // so we start authenticating this client B.
      this.authItem = this.queue.shift();
      debug('releasing. queue length', this.queue.length);
      this.authItem.resolve();
    }
  }

  /**
   * Used only when a negotiate connection
   * does not go to its final state before timeout.
   *
   * Note: Do not interfer with cookies.
   *
   * @param {AuthItem} authItem
   * @returns
   * @memberof ServerContextHandleManager
   */
  tooLate(authItem: AuthItem): void {
    while (this.queue.length > 0) {
      const ai = this.queue.shift();
      clearTimeout(ai.timeout);
      this.authItem.reject();
    }
    this.authItem = authItem;
    this.authItem.resolve();
  }

  setMethod(method: SSOMethod, cookieToken: CookieToken): void {
    if (cookieToken) {
      const contextInfo = this.sessionMap.get(cookieToken);
      contextInfo.method = method;
      return;
    }
    this.method = method;
  }

  getMethod(cookieToken: CookieToken): SSOMethod {
    if (cookieToken) {
      const contextInfo = this.sessionMap.get(cookieToken);
      return contextInfo.method;
    }
    return this.method;
  }
}
