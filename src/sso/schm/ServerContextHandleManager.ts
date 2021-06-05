import { IncomingMessage } from 'http';
import { CtxtHandle } from '../../../lib/api';

interface Item {
  timestamp: number;
  handle: CtxtHandle;
}

// 2 minutes
const DELAY = 1000 * 60 * 2;

const getUniqueId = (req: IncomingMessage): string => {
  // Manage the case where we are behind a proxy.
  // Proxy must configure a 'forwarded' header.
  if (req.headers['forwarded']) {
    return req.headers['forwarded'];
  }
  if (req.headers['x-forwarded-for'])
    return [req.headers['x-forwarded-for'], req.headers['connection']].join(
      '_'
    );
  if (req.headers['x-real-ip']) {
    return [req.headers['x-real-ip'], req.headers['connection']].join('_');
  }

  // manage the case where there is no proxy.
  return [req.socket.remoteAddress, req.socket.remotePort].join('_');
};

const getId = (req: IncomingMessage): string => {
  const id = getUniqueId(req);
  return id;
};

export class ServerContextHandleManager {
  cache = new Map<string, Item>();

  release(req: IncomingMessage) {
    this.refresh();
    this.cache.delete(getId(req));
  }

  get(req: IncomingMessage): CtxtHandle | undefined {
    this.refresh();
    const handle = this.cache.get(getId(req))?.handle;
    console.log('handle: ', handle);
    return handle;
  }

  set(req: IncomingMessage, handle: CtxtHandle) {
    this.refresh();
    const item = this.cache.get(getId(req));

    if (item) {
      item.handle = handle;
      return;
    }
    this.cache.set(getId(req), {
      handle,
      timestamp: new Date().getTime(),
    });
  }

  refresh() {
    for (const [k, v] of [...this.cache.entries()]) {
      if (v.timestamp < new Date().getTime() - DELAY) {
        console.log('delete k', k);
        this.cache.delete(k);
      }
    }
  }
}
