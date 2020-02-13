if (require("os").platform() !== "win32") {
  throw new Error(
    "The module 'node-expose-sspi' can only work on Microsoft Windows platform."
  );
}

const sspi = require("./lib/sspi");

module.exports = sspi;

sspi.ssoAuth = require("./src/ssoAuth")(sspi);
sspi.connect = require("./src/connect")(sspi);
sspi.createSSO = require("./src/createSSO")(sspi);
sspi.getDefaultDomain = require("./src/getDefaultDomain")(sspi);
