"use strict";
exports.__esModule = true;
var createSSO_1 = require("./src/createSSO");
var auth_1 = require("./src/auth");
var connect_1 = require("./src/connect");
var getDefaultDomain_1 = require("./src/getDefaultDomain");
if (require("os").platform() !== "win32") {
    throw new Error("The module 'node-expose-sspi' can only work on Microsoft Windows platform.");
}
var sspi = require("./lib/sspi");
exports.sso = {
    sspi: sspi,
    auth: auth_1.auth,
    connect: connect_1.connect,
    createSSO: createSSO_1.createSSO,
    getDefaultDomain: getDefaultDomain_1.getDefaultDomain
};
