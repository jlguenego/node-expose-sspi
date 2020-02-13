const { printHexDump, trace } = require("../src/misc");

connect = sspi => userCredential => {
  const errorMsg = "error while building the security context";
  try {
    const packageInfo = sspi.QuerySecurityPackageInfo("Negotiate");
    const clientCred = sspi.AcquireCredentialsHandle({
      packageName: "Negotiate",
      authData: {
        domain: userCredential.domain,
        user: userCredential.user,
        password: userCredential.password
      }
    });
    const serverCred = sspi.AcquireCredentialsHandle({
      packageName: "Negotiate"
    });

    let serverSecurityContext;
    let clientSecurityContext;
    let clientInput = {
      credential: clientCred.credential,
      targetName: "kiki",
      cbMaxToken: packageInfo.cbMaxToken
    };

    let serverInput = {
      credential: serverCred.credential
    };
    let i = 0;
    while (true) {
      console.log("i: ", i);
      i++;

      if (serverSecurityContext) {
        clientInput.serverSecurityContext = serverSecurityContext;
        clientInput.clientContextHandle =
          clientSecurityContext.clientContextHandle;
      }
      clientSecurityContext = sspi.InitializeSecurityContext(clientInput);
      console.log("clientSecurityContext: ", clientSecurityContext);
      console.log(printHexDump(clientSecurityContext.SecBufferDesc.buffers[0]));
      if (
        clientSecurityContext.SECURITY_STATUS !== "SEC_I_CONTINUE_NEEDED" &&
        clientSecurityContext.SECURITY_STATUS !== "SEC_E_OK"
      ) {
        throw errorMsg;
      }

      serverInput.clientSecurityContext = clientSecurityContext;
      if (serverSecurityContext) {
        serverInput.serverContextHandle =
          serverSecurityContext.serverContextHandle;
      }

      serverSecurityContext = sspi.AcceptSecurityContext(serverInput);
      console.log("serverSecurityContext: ", serverSecurityContext);
      console.log(printHexDump(serverSecurityContext.SecBufferDesc.buffers[0]));
      if (
        serverSecurityContext.SECURITY_STATUS !== "SEC_I_CONTINUE_NEEDED" &&
        serverSecurityContext.SECURITY_STATUS !== "SEC_E_OK"
      ) {
        throw errorMsg;
      }
      if (serverSecurityContext.SECURITY_STATUS !== "SEC_E_OK") {
        continue;
      }
      // we have the security context !!!
      console.log("We have the security context !!!");
      break;
    }

    const sso = sspi.createSSO(serverSecurityContext.serverContextHandle);
    return sso;
  } catch (e) {
    console.error("error", e);
  }

  return undefined;
};

module.exports = connect;