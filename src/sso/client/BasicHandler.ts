import { RequestInit, Response } from 'node-fetch';
import { AbstractHandler } from './AbstractHandler';
import { ClientCookie } from './ClientCookie';
import { ClientInfo } from './ClientInfo';

import dbg from 'debug';
const debug = dbg('node-expose-sspi:test');

export class BasicHandler extends AbstractHandler {
  async handle(
    clientInfo: ClientInfo,
    clientCookie: ClientCookie,
    response: Response,
    resource: string,
    init: RequestInit = {}
  ): Promise<Response> {
    debug('basic handler');

    return response;
  }
}
