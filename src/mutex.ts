import { EventEmitter } from 'events';
import dbg from 'debug';

const debug = dbg('node-expose-sspi:mutex');

interface ReleaseFn {
  (): void;
}

interface Task {
  resolve(releaseFn: ReleaseFn): void;
}

export class Mutex {
  private isBusy = false;
  private queue: Task[] = [];
  private signal = new EventEmitter();

  constructor() {
    const releaseFn = () => {
      this.isBusy = false;
      this.signal.emit('release');
    };

    this.signal.on('release', () => {
      debug('release');
      if (this.queue.length === 0) {
        this.isBusy = false;
        return;
      }
      const { resolve } = this.queue.shift();
      this.isBusy = true;
      resolve(releaseFn);
    });
  }

  async acquire(): Promise<ReleaseFn> {
    return new Promise((resolve) => {
      debug('acquire');
      const releaseFn = () => {
        this.isBusy = false;
        this.signal.emit('release');
      };

      if (!this.isBusy) {
        this.isBusy = true;
        return resolve(releaseFn);
      }
      this.queue.push({ resolve });
    });
  }
}

export const activeDirectoryMutex = new Mutex();
