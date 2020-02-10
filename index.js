if (require("os").platform() !== "win32") {
  throw new Error(
    "The module 'node-expose-sspi' can only work on Microsoft Windows platform."
  );
}

const createError = require("http-errors");
const { decode, encode } = require("base64-arraybuffer");
const sspi = require("bindings")("sspi");

const { printHexDump, trace } = require("./misc/misc");

module.exports = sspi;

sspi.ssoAuth = () => {
  const { credential, tsExpiry } = sspi.AcquireCredentialsHandle("Negotiate");

  // serverContextHandle seems to be useful only for NTLM, not Kerberos.
  // because Kerberos will not request many times the client to complete the SSO Authentication.
  let serverContextHandle;

  return (req, res, next) => {
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
          "Negotiate " + encode(serverSecurityContext.SecBufferDesc.buffers[0])
        )
        .end();
    }

    if (serverSecurityContext.SECURITY_STATUS === "SEC_E_OK") {
      res.set(
        "WWW-Authenticate",
        "Negotiate " + encode(serverSecurityContext.SecBufferDesc.buffers[0])
      );

      // get the username.
      // impersonate the user.

      sspi.ImpersonateSecurityContext(serverContextHandle);
      trace("impersonate security context ok");
      const username = sspi.GetUserName();
      trace("username: ", username);
      req.user = { name: username };
      const { sid, domain } = sspi.LookupAccountName(username);
      req.user.sid = sid;
      req.user.domain = domain;
      const userToken = sspi.OpenThreadToken();
      trace("userToken: ", userToken);
      const groups = sspi.GetTokenInformation(userToken, "TokenGroups");
      trace("groups: ", groups);
      sspi.CloseHandle(userToken);
      req.user.groups = groups;
      sspi.RevertSecurityContext(serverContextHandle);
      const owner = sspi.GetUserName();
      trace("owner: ", owner);
      req.owner = { name: owner };
      serverContextHandle = undefined;
    }

    next();
  };
};
