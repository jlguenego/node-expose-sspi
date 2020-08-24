import dbg from 'debug';

import { ServerContextHandleManager } from './ServerContextHandleManager';
import { CtxtHandle } from '../../../lib/api';
import { SSOMethod } from '../interfaces';

const debug = dbg('node-expose-sspi:schManager');

type IPromiseFn = (value?: unknown) => void;

interface AuthItem {
  resolve?: IPromiseFn;
  reject?: IPromiseFn;
  timeout: NodeJS.Timeout;
}

const TOO_LATE_ERROR_MSG = 'too many concurrent connections.';

export class SCHMWithSync extends ServerContextHandleManager {
  /**
   * The authentication currently being processed.
   *
   * @private
   * @type {AuthItem}
   * @memberof SCHMWithSync
   */
  private authItem: AuthItem;

  /**
   * The queue of other authentication that are waiting.
   *
   * @private
   * @type {AuthItem[]}
   * @memberof SCHMWithSync
   */
  private queue: AuthItem[] = [];

  private serverContextHandle: CtxtHandle;
  private method: SSOMethod;

  constructor(private delayMax = 20000) {
    super();
  }

  waitForReleased(): Promise<void> {
    return new Promise((resolve, reject) => {
      debug('waitForReleased: start promise');
      const timeout = setTimeout(() => {
        this.interrupt();
      }, this.delayMax);
      // if nobody else is currently authenticating then go now.
      if (this.authItem === undefined) {
        debug('waitForReleased: we can start now.');
        this.authItem = { timeout };
        return resolve();
      }

      debug(
        'someone is currently authenticating, go in the queue and wait for your turn.'
      );
      this.queue.push({ resolve, reject, timeout });
      debug('queue length', this.queue.length);
    });
  }

  getMethod(): SSOMethod {
    return this.method;
  }

  setMethod(ssoMethod: SSOMethod): void {
    this.method = ssoMethod;
  }

  getHandle(): CtxtHandle {
    return this.serverContextHandle;
  }

  setHandle(contextHandle: CtxtHandle): void {
    this.serverContextHandle = contextHandle;
  }

  release(): void {
    if (this.authItem) {
      clearTimeout(this.authItem.timeout);
    }
    this.serverContextHandle = undefined;
    this.authItem = undefined;
    if (this.queue.length > 0) {
      // it means another client B was waiting for authenticating.
      // so we start authenticating this client B.
      this.authItem = this.queue.shift();
      debug('releasing. queue length', this.queue.length);
      this.authItem.resolve();
    }
  }

  /**
   * after timeout, all the queue is removed and rejected.
   * does not go to its final state before timeout.
   *
   *
   * @param {AuthItem} authItem
   * @returns
   * @memberof ServerContextHandleManager
   */
  interrupt(): void {
    while (this.queue.length > 0) {
      const ai = this.queue.pop();
      clearTimeout(ai.timeout);
      ai.reject(TOO_LATE_ERROR_MSG);
    }
    this.authItem = undefined;
    this.serverContextHandle = undefined;
  }
}
