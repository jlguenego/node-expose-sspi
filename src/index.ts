import os from 'os';

/* istanbul ignore if */
if (os.platform() !== 'win32') {
  throw new Error(
    "The module 'node-expose-sspi' can only work on Microsoft Windows platform."
  );
}

export * from '../lib/api';
export { sso } from './sso/index';
