"use strict";
exports.__esModule = true;
var createError = require("http-errors");
var _a = require("base64-arraybuffer"), decode = _a.decode, encode = _a.encode;
var misc_1 = require("./misc");
var sspi = require("../lib/sspi");
var createSSO_1 = require("./createSSO");
exports.auth = function () {
    var _a = sspi.AcquireCredentialsHandle({
        packageName: "Negotiate"
    }), credential = _a.credential, tsExpiry = _a.tsExpiry;
    // serverContextHandle seems to be useful only for NTLM, not Kerberos.
    // because Kerberos will not request many times the client to complete the SSO Authentication.
    var serverContextHandle;
    return function (req, res, next) {
        try {
            var auth_1 = req.get("authorization");
            if (!auth_1) {
                serverContextHandle = undefined;
                return res
                    .status(401)
                    .set("WWW-Authenticate", "Negotiate")
                    .end();
            }
            if (!auth_1.startsWith("Negotiate ")) {
                return next(createError(400, "Malformed authentication token " + auth_1));
            }
            req.auth = req.auth || {};
            req.auth.token = auth_1.substring("Negotiate ".length);
            var protocol = req.auth.token.startsWith("YII") ? "Kerberos" : "NTLM";
            misc_1.trace("SPNEGO token: " + protocol);
            var buffer = decode(req.auth.token);
            var input = {
                credential: credential,
                clientSecurityContext: {
                    SecBufferDesc: {
                        ulVersion: 0,
                        buffers: [buffer]
                    }
                }
            };
            if (serverContextHandle) {
                input.contextHandle = serverContextHandle;
            }
            var serverSecurityContext = sspi.AcceptSecurityContext(input);
            serverContextHandle = serverSecurityContext.contextHandle;
            misc_1.trace(misc_1.printHexDump(serverSecurityContext.SecBufferDesc.buffers[0]));
            if (serverSecurityContext.SECURITY_STATUS === "SEC_I_CONTINUE_NEEDED") {
                return res
                    .status(401)
                    .set("WWW-Authenticate", "Negotiate " +
                    encode(serverSecurityContext.SecBufferDesc.buffers[0]))
                    .end();
            }
            if (serverSecurityContext.SECURITY_STATUS === "SEC_E_OK") {
                res.set("WWW-Authenticate", "Negotiate " + encode(serverSecurityContext.SecBufferDesc.buffers[0]));
                req.sso = createSSO_1.createSSO(serverContextHandle);
                sspi.DeleteSecurityContext(serverContextHandle);
                serverContextHandle = undefined;
            }
        }
        catch (e) {
            console.error(e);
            next(createError(400, "Unexpected error while doing SSO. Please contact your system administrator."));
        }
        next();
    };
};
