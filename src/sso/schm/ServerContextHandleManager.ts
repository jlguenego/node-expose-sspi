import { IncomingMessage } from 'http';
import { CtxtHandle } from '../../../lib/api';

interface Item {
  id: string;
  timestamp: number;
  handle: CtxtHandle;
}

// 2 minutes
const DELAY = 1000 * 60 * 2;

const getId = (req: IncomingMessage): string => {
  return req.socket.remoteAddress + '_' + req.socket.remotePort;
};

export class ServerContextHandleManager {
  cache: Item[] = [];

  release(req: IncomingMessage) {
    this.refresh();
    this.cache = this.cache.filter((v) => v.id !== getId(req));
  }

  get(req: IncomingMessage) {
    this.refresh();
    return this.cache.find((v) => v.id === getId(req))?.handle;
  }

  set(req: IncomingMessage, handle: CtxtHandle) {
    this.refresh();
    const item = this.cache.find((v) => v.id === getId(req));
    if (item) {
      item.handle = handle;
      return;
    }
    this.cache.push({
      id: getId(req),
      handle,
      timestamp: new Date().getTime(),
    });
  }

  refresh() {
    this.cache = this.cache.filter(
      (v) => v.timestamp > new Date().getTime() - DELAY
    );
  }
}
