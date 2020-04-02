import { CtxtHandle } from '../lib/api';

interface IResolve {
  (value?: unknown): void;
}

interface AuthItem {
  resolve: IResolve;
  // timeout: NodeJS.Timeout
}

export class ServerContextHandleManager {
  private serverContextHandle: CtxtHandle;
  private queue: AuthItem[] = [];
  private authItem: AuthItem;

  constructor(private delayMax = 20000) {}

  async waitForReleased() {
    return new Promise(resolve => {
      // if nobody else is currently authenticating then go now.
      if (this.authItem === undefined) {
        this.authItem = { resolve };
        return this.authItem.resolve();
      }

      // someone is currently authenticating, go in the queue and wait for your turn.
      this.queue.push({ resolve });
      // const timeout = setTimeout(() => {
      //   // abandon the authenticating...
      //   this.release();
      // }, this.delayMax);
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
    this.authItem = undefined;
    if (this.queue.length > 0) {
      // it means another client B was waiting for authenticating.
      // so we start authenticating this client B.
      this.authItem = this.queue.shift();
      this.authItem.resolve();
    }
  }
}
