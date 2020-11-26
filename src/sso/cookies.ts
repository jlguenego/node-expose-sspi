import http from 'http';
import { CookieList } from './interfaces';

// https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
export function parseCookies(request: http.IncomingMessage): CookieList {
  const list: CookieList = {};
  const rc = request.headers.cookie;

  rc?.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    list[(parts.shift() as string).trim()] = decodeURI(parts.join('='));
  });

  return list;
}
