import { printHexDump, trace } from "./misc";
import sspi = require("../lib/sspi");
import { createSSO } from './createSSO';

export const connect = (userCredential: sspi.UserCredential) => {
  const errorMsg = "error while building the security context";
  const badLoginPasswordMsg = "sorry mate, wrong login/password.";
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

    let serverSecurityContext: sspi.SecurityContext;
    let clientSecurityContext: sspi.SecurityContext;
    let clientInput: sspi.InitializeSecurityContextInput = {
      credential: clientCred.credential,
      targetName: "kiki",
      cbMaxToken: packageInfo.cbMaxToken
    };

    let serverInput: sspi.AcceptSecurityContextInput = {
      credential: serverCred.credential,
      clientSecurityContext: undefined
    };
    let i = 0;
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
      if (
        clientSecurityContext.SECURITY_STATUS !== "SEC_I_CONTINUE_NEEDED" &&
        clientSecurityContext.SECURITY_STATUS !== "SEC_E_OK"
      ) {
        throw errorMsg;
      }

      serverInput.clientSecurityContext = clientSecurityContext;
      if (serverSecurityContext) {
        serverInput.contextHandle =
          serverSecurityContext.contextHandle;
      }

      serverSecurityContext = sspi.AcceptSecurityContext(serverInput);
      console.log("serverSecurityContext: ", serverSecurityContext);
      if (
        serverSecurityContext.SECURITY_STATUS !== "SEC_I_CONTINUE_NEEDED" &&
        serverSecurityContext.SECURITY_STATUS !== "SEC_E_OK"
      ) {
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

    const sso = createSSO(serverSecurityContext.contextHandle);
    if (sso.user.name === "Guest") {
      throw badLoginPasswordMsg;
    }
    return sso;
  } catch (e) {
    console.error("error", e);
  }

  return undefined;
};
