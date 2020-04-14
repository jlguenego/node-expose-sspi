import { adsi } from '..';
import dbg from 'debug';
const debug = dbg('node-expose-sspi:adConnection');

const adConnection = {
  counter: 0,
};

/**
 * Open an Active Directory connection only if no connection is already open.
 *
 * @export
 */
export function openADConnection(): void {
  if (adConnection.counter < 0) {
    adConnection.counter = 0;
  }
  if (adConnection.counter === 0) {
    adsi.CoInitializeEx(['COINIT_MULTITHREADED']);
  }
  adConnection.counter++;
  debug('openADConnection: counter: ', adConnection.counter);
}

/**
 * Close an Active Directory connection only if nobodyelse still use a connection.
 *
 * @export
 */
export function closeADConnection(): void {
  adConnection.counter--;
  if (adConnection.counter === 0) {
    adsi.CoUninitialize();
  }
  if (adConnection.counter < 0) {
    adConnection.counter = 0;
  }
  debug('closeADConnection: counter: ', adConnection.counter);
}
