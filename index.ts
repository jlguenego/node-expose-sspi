if (require('os').platform() !== 'win32') {
  throw new Error(
    "The module 'node-expose-sspi' can only work on Microsoft Windows platform."
  );
}

import { sspi, adsi, sysinfo } from './lib/sspi';
import { sso } from './src/index';

export {
  sspi,
  adsi,
  sysinfo,
  sso,
};
