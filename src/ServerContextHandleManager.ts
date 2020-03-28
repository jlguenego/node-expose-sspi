import { CtxtHandle } from '../lib/api';

export class ServerContextHandleManager {
  private serverContextHandle: CtxtHandle;
  private isAuthenticating = false;
  private timeout: NodeJS.Timeout;
  private resolve: (value?: unknown) => void;

  constructor(private delayMax = 20000) {}

  async waitForReleased() {
    return new Promise(resolve => {
      if (this.isAuthenticating === false) {
        this.isAuthenticating = true;
        return resolve();
      }
      this.resolve = resolve;
      this.timeout = setTimeout(() => {
        // abondon the authenticating...
        this.release();
      }, this.delayMax);
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
    this.isAuthenticating = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    if (this.resolve) {
      // it means another client B was waiting for authenticating.
      // so we start authenticating this client B.
      this.isAuthenticating = true;
      const resolve = this.resolve;
      this.resolve = undefined;
      resolve();
    }
  }
}
