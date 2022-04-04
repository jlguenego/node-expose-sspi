import type { RequestInit, Response } from 'node-fetch';
import { ClientCookie } from './ClientCookie';
import { ClientInfo } from './ClientInfo';

export abstract class AbstractHandler {
  abstract handle(
    clientInfo: ClientInfo,
    clientCookie: ClientCookie,
    response: Response,
    resource: string,
    init: RequestInit
  ): Promise<Response>;
}
