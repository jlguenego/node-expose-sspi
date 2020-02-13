const createError = require("http-errors");
const { decode, encode } = require("base64-arraybuffer");
const { printHexDump, trace } = require("../src/misc");


const ssoAuth = sspi => () => {
  const { credential, tsExpiry } = sspi.AcquireCredentialsHandle({
    packageName: "Negotiate"
  });

  // serverContextHandle seems to be useful only for NTLM, not Kerberos.
  // because Kerberos will not request many times the client to complete the SSO Authentication.
  let serverContextHandle;

  return (req, res, next) => {
    try {
      const auth = req.get("authorization");
      if (!auth) {
        serverContextHandle = undefined;
        return res
          .status(401)
          .set("WWW-Authenticate", "Negotiate")
          .end();
      }

      if (!auth.startsWith("Negotiate ")) {
        return next(createError(400, `Malformed authentication token ${auth}`));
      }

      req.auth = req.auth || {};
      req.auth.token = auth.substring("Negotiate ".length);
      const protocol = req.auth.token.startsWith("YII") ? "Kerberos" : "NTLM";
      trace("SPNEGO token: " + protocol);
      const buffer = decode(req.auth.token);

      const input = {
        credential,
        clientSecurityContext: {
          SecBufferDesc: {
            ulVersion: 0,
            buffers: [buffer]
          }
        }
      };
      if (serverContextHandle) {
        input.serverContextHandle = serverContextHandle;
      }
      const serverSecurityContext = sspi.AcceptSecurityContext(input);
      serverContextHandle = serverSecurityContext.serverContextHandle;

      trace(printHexDump(serverSecurityContext.SecBufferDesc.buffers[0]));

      if (serverSecurityContext.SECURITY_STATUS === "SEC_I_CONTINUE_NEEDED") {
        return res
          .status(401)
          .set(
            "WWW-Authenticate",
            "Negotiate " +
              encode(serverSecurityContext.SecBufferDesc.buffers[0])
          )
          .end();
      }

      if (serverSecurityContext.SECURITY_STATUS === "SEC_E_OK") {
        res.set(
          "WWW-Authenticate",
          "Negotiate " + encode(serverSecurityContext.SecBufferDesc.buffers[0])
        );

        req.sso = sspi.createSSO(serverContextHandle);

        sspi.DeleteSecurityContext(serverContextHandle);
        serverContextHandle = undefined;
      }
    } catch (e) {
      console.error(e);
      next(
        createError(
          400,
          `Unexpected error while doing SSO. Please contact your system administrator.`
        )
      );
    }

    next();
  };
};

module.exports = ssoAuth;
