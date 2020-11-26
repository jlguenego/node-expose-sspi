import os from 'os';

/* istanbul ignore if */
if (os.platform() !== 'win32') {
  throw new Error(
    "The module 'node-expose-sspi' only can work on Microsoft Windows platform."
  );
}

/* istanbul ignore if */
if (process.version < 'v12.16.1') {
  throw new Error(
    "The module 'node-expose-sspi' only can work on Node >= v.12.16.1."
  );
}

export * from '../lib/api';
export { sso, NextFunction } from './sso/index';
