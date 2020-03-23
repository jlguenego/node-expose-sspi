if (require("os").platform() !== "win32") {
  throw new Error(
    "The module 'node-expose-sspi' can only work on Microsoft Windows platform."
  );
}

import sspi = require("./lib/sspi");
import {sso, adsi } from "./src/index";

export { sspi, sso, adsi };
