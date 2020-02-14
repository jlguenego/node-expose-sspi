"use strict";
exports.__esModule = true;
var _a = require("../src/misc"), printHexDump = _a.printHexDump, trace = _a.trace;
var sspi = require("../lib/sspi");
var createSSO_1 = require("./createSSO");
exports.connect = function (userCredential) {
    var errorMsg = "error while building the security context";
    var badLoginPasswordMsg = "sorry mate, wrong login/password.";
    try {
        var packageInfo = sspi.QuerySecurityPackageInfo("Negotiate");
        var clientCred = sspi.AcquireCredentialsHandle({
            packageName: "Negotiate",
            authData: {
                domain: userCredential.domain,
                user: userCredential.user,
                password: userCredential.password
            }
        });
        var serverCred = sspi.AcquireCredentialsHandle({
            packageName: "Negotiate"
        });
        var serverSecurityContext = void 0;
        var clientSecurityContext = void 0;
        var clientInput = {
            credential: clientCred.credential,
            targetName: "kiki",
            cbMaxToken: packageInfo.cbMaxToken
        };
        var serverInput = {
            credential: serverCred.credential,
            clientSecurityContext: undefined
        };
        var i = 0;
        while (true) {
            console.log("i: ", i);
            i++;
            if (serverSecurityContext) {
                clientInput.serverSecurityContext = serverSecurityContext;
                clientInput.contextHandle =
                    clientSecurityContext.contextHandle;
            }
            clientSecurityContext = sspi.InitializeSecurityContext(clientInput);
            console.log("clientSecurityContext: ", clientSecurityContext);
            console.log(printHexDump(clientSecurityContext.SecBufferDesc.buffers[0]));
            if (clientSecurityContext.SECURITY_STATUS !== "SEC_I_CONTINUE_NEEDED" &&
                clientSecurityContext.SECURITY_STATUS !== "SEC_E_OK") {
                throw errorMsg;
            }
            serverInput.clientSecurityContext = clientSecurityContext;
            if (serverSecurityContext) {
                serverInput.contextHandle =
                    serverSecurityContext.contextHandle;
            }
            serverSecurityContext = sspi.AcceptSecurityContext(serverInput);
            console.log("serverSecurityContext: ", serverSecurityContext);
            if (serverSecurityContext.SECURITY_STATUS !== "SEC_I_CONTINUE_NEEDED" &&
                serverSecurityContext.SECURITY_STATUS !== "SEC_E_OK") {
                if (serverSecurityContext.SECURITY_STATUS == "SEC_E_LOGON_DENIED") {
                    throw badLoginPasswordMsg;
                }
                throw errorMsg;
            }
            console.log(printHexDump(serverSecurityContext.SecBufferDesc.buffers[0]));
            if (serverSecurityContext.SECURITY_STATUS !== "SEC_E_OK") {
                continue;
            }
            // we have the security context !!!
            console.log("We have the security context !!!");
            break;
        }
        var sso = createSSO_1.createSSO(serverSecurityContext.contextHandle);
        if (sso.user.name === "Guest") {
            throw badLoginPasswordMsg;
        }
        return sso;
    }
    catch (e) {
        console.error("error", e);
    }
    return undefined;
};
