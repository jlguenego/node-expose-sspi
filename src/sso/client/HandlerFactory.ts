import { AbstractHandler } from './AbstractHandler';
import { BasicHandler } from './BasicHandler';
import { DigestHandler } from './DigestHandler';
import { NegotiateHandler } from './NegotiateHandler';

export class HandlerFactory {
  static instantiate(method: string): AbstractHandler {
    if (method === 'Negotiate') {
      return new NegotiateHandler();
    }
    if (method === 'Basic') {
      return new BasicHandler();
    }
    if (method === 'Digest') {
      return new DigestHandler();
    }
    throw new Error('Cannot handle this authentication method');
  }
}
