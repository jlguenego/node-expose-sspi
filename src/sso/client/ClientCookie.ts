import type { RequestInit, Response } from 'node-fetch';
import dbg from 'debug';

import { CookieList } from '../interfaces';

const debug = dbg('node-expose-sspi:client');

export class ClientCookie {
  private cookieList: CookieList = {};

  saveCookies(response: Response): void {
    response.headers.forEach((value, name) => {
      if (name !== 'Set-Cookie'.toLowerCase()) {
        return;
      }
      // parse something like <key>=<val>[; Expires=xxxxx;]
      const [key, val] = value.split(/[=;]/g);
      debug('val: ', val);
      debug('key: ', key);
      this.cookieList[key] = val;
    });
    debug('cookieList: ', this.cookieList);
  }

  restituteCookies(requestInit: RequestInit): void {
    const cookieStr = Object.keys(this.cookieList)
      .map((key) => key + '=' + this.cookieList[key])
      .join('; ');
    if (cookieStr.length === 0) {
      return;
    }
    requestInit.headers = { ...requestInit.headers, cookie: cookieStr };
  }
}
