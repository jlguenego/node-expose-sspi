import dbg from 'debug';

const debug = dbg('node-expose-sspi:misc');

/**
 * Sleep for time (in millisecond) and wake up.
 *
 * @export
 * @param {number} time
 * @returns {Promise<void>}
 */
export function sleep(time: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      debug('sleep wake up after', time);
      resolve();
    }, time)
  );
}
