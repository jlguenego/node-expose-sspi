import http from 'http';
import { CookieList } from './interfaces';
import { RequestInit, Response, HeadersInit } from 'node-fetch';
import dbg from 'debug';

const debug = dbg('node-expose-sspi:cookies');

// https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
export function parseCookies(request: http.IncomingMessage): CookieList {
  const list: CookieList = {};
  const rc = request.headers.cookie;

  rc &&
    rc.split(';').forEach((cookie) => {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

  return list;
}

const cookieList: CookieList = {};

export function saveCookies(response: Response): void {
  response.headers.forEach((value, name) => {
    if (name !== 'Set-Cookie'.toLowerCase()) {
      return;
    }
    // parse something like <key>=<val>[; Expires=xxxxx;]
    const [key, val] = value.split(/[=;]/g);
    debug('val: ', val);
    debug('key: ', key);
    cookieList[key] = val;
  });
  debug('cookieList: ', cookieList);
}

export function restituteCookies(requestInit: RequestInit): void {
  const cookieStr = Object.keys(cookieList)
    .map((key) => key + '=' + cookieList[key])
    .join('; ');
  Object.assign(requestInit.headers, { cookie: cookieStr });
}
