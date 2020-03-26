import os from 'os';

if (os.platform() !== 'win32') {
  throw new Error(
    "The module 'node-expose-sspi' can only work on Microsoft Windows platform."
  );
}

export * from './lib/api';
export { sso } from './src/index';
