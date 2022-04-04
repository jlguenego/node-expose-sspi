import dbg from 'debug';
import type { RequestInit, Response } from 'node-fetch';
import { loadNodeFetch } from '../loadNodeFetch';

import { AbstractHandler } from './AbstractHandler';
import { ClientCookie } from './ClientCookie';
import { ClientInfo } from './ClientInfo';
import { encodeBase64 } from './misc';

const debug = dbg('node-expose-sspi:client');

export class BasicHandler extends AbstractHandler {
  async handle(
    clientInfo: ClientInfo,
    clientCookie: ClientCookie,
    response: Response,
    resource: string,
    init: RequestInit = {}
  ): Promise<Response> {
    debug('basic handler');
    const requestInit: RequestInit = { ...init };
    const str = clientInfo.user + ':' + clientInfo.password;
    requestInit.headers = {
      ...init.headers,
      Authorization: 'Basic ' + encodeBase64(str),
    };
    clientCookie.restituteCookies(requestInit);
    debug('first requestInit.headers', requestInit.headers);
    const { fetch } = await loadNodeFetch();
    response = await fetch(resource, requestInit);
    debug('first response.headers', response.headers);
    clientCookie.saveCookies(response);
    return response;
  }
}
