import { SecurityContext, CtxtHandle } from '../lib/api';
import { EventEmitter } from 'events';

export class ServerContextHandleManager {
  private serverContextHandle: CtxtHandle;
  private releaseEvent = new EventEmitter();

  constructor(private delayMax = 2000) {}

  async waitForReleased() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.release();
      }, this.delayMax);
      this.releaseEvent.on('released', () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }

  set(serverContextHandle: CtxtHandle) {
    this.serverContextHandle = serverContextHandle;
  }

  getServerContextHandle(): CtxtHandle {
    return this.serverContextHandle;
  }

  release() {
    this.serverContextHandle = undefined;
    this.releaseEvent.emit('released');
  }
}
