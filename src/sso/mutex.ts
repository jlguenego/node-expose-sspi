import dbg from 'debug';

const debug = dbg('node-expose-sspi:mutex');

type ReleaseFn = () => void;

interface Task {
  resolve(releaseFn: ReleaseFn): void;
}

export class Mutex {
  private isBusy = false;
  private queue: Task[] = [];

  private onRelease(): void {
    debug('release');
    if (this.queue.length === 0) {
      this.isBusy = false;
      return;
    }
    const { resolve } = this.queue.shift();
    debug('decrease queue size', this.queue.length);
    this.isBusy = true;
    resolve(this.onRelease.bind(this));
  }

  async acquire(): Promise<ReleaseFn> {
    return new Promise((resolve) => {
      debug('acquire');
      if (!this.isBusy) {
        this.isBusy = true;
        return resolve(this.onRelease.bind(this));
      }
      this.queue.push({ resolve });
      debug('increase queue size', this.queue.length);
    });
  }
}

export const activeDirectoryMutex = new Mutex();
