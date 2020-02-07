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

sspi.auth = () => {
  const { credential, tsExpiry } = sspi.AcquireCredentialsHandle("Negotiate");
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
      req.user = username;
      const accessToken = sspi.QuerySecurityContextToken(serverContextHandle);
      const groups = sspi.GetTokenInformation(accessToken, "TokenGroups");
      req.groups = groups;
      sspi.RevertSecurityContext(serverContextHandle);
      const owner = sspi.GetUserName();
      trace("owner: ", owner);
      req.owner = owner;
      serverContextHandle = undefined;
    }

    next();
  };
};
