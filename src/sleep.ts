import dbg from 'debug';

const debug = dbg('node-expose-sspi:misc');

export const sleep = (time: number): Promise<void> =>
  new Promise(resolve =>
    setTimeout(() => {
      debug('sleep wake up after', time);
      resolve();
    }, time)
  );
