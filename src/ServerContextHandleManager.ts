import { CtxtHandle } from '../lib/api';

interface IPromiseFn {
  (value?: unknown): void;
}

interface AuthItem {
  resolve: IPromiseFn;
  reject: IPromiseFn;
  timeout?: NodeJS.Timeout;
}

export class ServerContextHandleManager {
  private serverContextHandle: CtxtHandle;
  private queue: AuthItem[] = [];
  private authItem: AuthItem;

  constructor(private delayMax = 20000) {}

  async waitForReleased() {
    return new Promise((resolve, reject) => {
      // if nobody else is currently authenticating then go now.
      const authItem = { resolve, reject };
      const timeout = setTimeout(() => {
        this.tooLate(authItem);
      }, this.delayMax);
      if (this.authItem === undefined) {
        this.authItem = { resolve, reject, timeout };
        return this.authItem.resolve();
      }

      // someone is currently authenticating, go in the queue and wait for your turn.
      this.queue.push({ resolve, reject, timeout });
    });
  }

  set(serverContextHandle: CtxtHandle) {
    this.serverContextHandle = serverContextHandle;
  }

  getServerContextHandle(): CtxtHandle {
    return this.serverContextHandle;
  }

  release() {
    if (this.authItem) {
      clearTimeout(this.authItem.timeout);
    }
    this.serverContextHandle = undefined;
    this.authItem = undefined;
    if (this.queue.length > 0) {
      // it means another client B was waiting for authenticating.
      // so we start authenticating this client B.
      this.authItem = this.queue.shift();
      this.authItem.resolve();
    }
  }

  tooLate(authItem: AuthItem) {
    while (this.queue.length > 0) {
      const authItem = this.queue.shift();
      clearTimeout(authItem.timeout);
      this.authItem.reject();
    }
    return authItem.resolve();
  }
}
