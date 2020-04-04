import { CtxtHandle } from '../lib/api';
import http from 'http';
import { parseCookies } from './cookies';
import dbg from 'debug';

const debug = dbg('node-expose-sspi:schManager');

interface IPromiseFn {
  (value?: unknown): void;
}

interface AuthItem {
  resolve: IPromiseFn;
  reject: IPromiseFn;
  timeout?: NodeJS.Timeout;
}

const COOKIE_KEY = 'NEGOTIATE_ID';

export class ServerContextHandleManager {
  private serverContextHandle: CtxtHandle;
  private queue: AuthItem[] = [];
  private authItem: AuthItem;

  private useCookies = false;
  private req: http.IncomingMessage;
  private res: http.OutgoingMessage;
  private sessionMap = new Map<string, CtxtHandle>();

  constructor(private delayMax = 20000) {}

  setCookieMode(req: http.IncomingMessage, res: http.OutgoingMessage) {
    debug('setCookieMode');
    this.useCookies = true;
    this.req = req;
    debug('this.req.headers: ', this.req.headers);
    this.res = res;
    debug('sessionMap', this.sessionMap);
  }

  async waitForReleased() {
    if (this.useCookies) {
      const negotiateId = parseCookies(this.req)[COOKIE_KEY];
      if (!negotiateId) {
        const newId = 'NEGOTIATE_' + Math.floor(1e10 * Math.random());
        // create a session cookie (without expiration specified)
        this.res.setHeader('Set-Cookie', COOKIE_KEY + '=' + newId);
        this.sessionMap.set(newId, undefined);
        return;
      }
      this.sessionMap.set(negotiateId, undefined);
      return;
    }
    return new Promise((resolve, reject) => {
      // if nobody else is currently authenticating then go now.
      const authItem = { resolve, reject };
      const timeout = setTimeout(() => {
        this.tooLate(authItem);
      }, this.delayMax);
      if (this.authItem === undefined) {
        this.authItem = { resolve, reject, timeout };
        return this.authItem.resolve();
      }

      // someone is currently authenticating, go in the queue and wait for your turn.
      this.queue.push({ resolve, reject, timeout });
    });
  }

  set(serverContextHandle: CtxtHandle) {
    if (this.useCookies) {
      const negotiateId = parseCookies(this.req)[COOKIE_KEY];
      if (negotiateId === undefined) {
        throw new Error('cookie not found');
      }
      this.sessionMap.set(negotiateId, serverContextHandle);
      return;
    }
    this.serverContextHandle = serverContextHandle;
  }

  getServerContextHandle(): CtxtHandle {
    if (this.useCookies) {
      const negotiateId = parseCookies(this.req)[COOKIE_KEY];
      if (negotiateId === undefined) {
        throw new Error('cookie not found');
      }
      return this.sessionMap.get(negotiateId);
    }
    return this.serverContextHandle;
  }

  release() {
    if (this.useCookies) {
      const negotiateId = parseCookies(this.req)[COOKIE_KEY];
      this.sessionMap.set(negotiateId, undefined);
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
  tooLate(authItem: AuthItem) {
    while (this.queue.length > 0) {
      const authItem = this.queue.shift();
      clearTimeout(authItem.timeout);
      this.authItem.reject();
    }
    this.authItem = authItem;
    return this.authItem.resolve();
  }
}
