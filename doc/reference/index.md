# node-expose-sspi: Reference Guide

## Summary

- SSO
  - [on server side](#On-server-side)
  - [on client side](#On-client-side)
- Windows user administration
  - [Restarting windows](#Restarting-windows)
- C++ Addons
  - ADSI
  - NETAPI
  - SSPI
  - SYSINFO

## SSO

### On server side

The `node-expose-sspi` module allows you to have SSO on a web server. It gives a
middleware `sso.auth(options)` that will bring to the request a new properties
`req.sso` with authenticated user information.

#### Minimalist example

```js
const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();
app.use(sso.auth());

app.use((req, res) => {
  res.json({
    sso: req.sso,
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
```

Note that the `sso.auth()` is a middleware calling async functions, it may take
time to achieve its work, specially if a connection to the domain controller
needs to be done. So for performance reason it is better to use this middleware
only when really needed and not for every requests. The best way is to associate
the `sso.auth()` middleware to a cookie for having a session: using the
`sso.auth()` the first time user needs to authenticate, and then use the session
cookie for the remaining connections.

#### Increasing performance: session integration

Here is an example of integration with a session:

```js
const express = require('express');
const { sso } = require('node-expose-sspi');
const session = require('express-session');

const app = express();
app.use(
  session({
    name: 'express-sso-session',
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
  })
);

app.use(sso.auth({ useSession: true }));

app.use((req, res) => {
  res.json({
    // note that in this situation: req.session.sso === req.sso
    sso: req.sso,
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
```

You can see the attribute `req.sso.cached` that indicates if the `req.sso` comes
from the session (`true`) or the SSPI interface slow computation (`false`).

This saves times foreach request, supposing accessing to the session is faster
than accessing to the (unfortunately slow) SSPI Microsoft API.

**Production use**: the `express-session` module needs to be assisted with a
[production ready memory store](https://github.com/expressjs/session#compatible-session-stores).

#### AuthOptions

The middleware `sso.auth(options: AuthOptions)` comes with the following
options:

- **useActiveDirectory**: boolean. If server is on domain, then ask the server
  to contact a Active Directory Controller to get more detailed information
  about a user. Default true.
- **useGroups**: boolean. Show the group of the user (via its access token).
  Default true.
- **useOwner**: boolean. Show the user that run the server. Default false.
- **groupFilterRegex**: string. Filter the groups (C++ Regex). Default is
  `'.*'`.
- **allowsGuest**: boolean. Allow authentication as Guest, ie with a wrong
  login/password. Default false.
- **allowsAnonymousLogon**: boolean. Allo authentication as Anonymous, ie
  without providing a login and a password. Default false.
- **forceNTLM**: boolean. Force the NTLM authentication type instead of
  Negotiate. Default false.
- **useSession**: boolean. Use a session cache in order to avoid the
  authentication challenge foreach request. You must use `express-session` or
  equivalent. Default false.

### On client side

If you have a server with SSO, you can use it with a traditionnal browser
(Chrome, Edge, Firefox, etc.) but also with a client utility of the
`node-expose-sspi` module.

Here is an example:

```js
const { sso } = require('node-expose-sspi');

(async () => {
  try {
    const client = new sso.Client();
    const response = await client.fetch('http://localhost:3000');
    const json = await response.json();
    console.log('json: ', json);
  } catch (e) {
    console.error(e);
  }
})();
```

The API reference [is located here](../api/classes/_src_sso_client_.client.md).

The client can be configured with the following methods:

- `setCredentials(domain: string, user: string, password: string)`: connect with
  the credential of another windows account.
- `setSSP(ssp: SecuritySupportProvider)`: set the SecuritySupportProvider to
  force the client to use NTLM or Kerberos, or Negotiate. A
  SecuritySupportProvider is just one of the following strings:
  - NTLM
  - Kerberos
  - Negotiate
- `setTargetName(SPN: string)`: only useful for Kerberos protocol. The Kerberos
  client needs to know exactly the SPN of the server. It is calculated by
  default like Chrome, Edge, etc. but sometimes, you need to indicate it
  yourself because the default calculation may not be what is expected.

The client automatically supports the following authentication methods:

- Basic
- Digest
- Negotiate/Kerberos/NTLM

It has been tested until now with IIS and the node-expose-sspi auth client.
TODO: test with Apache on Windows.

#### Example

See:

- [client](../../examples/client)
- [client-runas](../../examples/client-runas)

## Windows user administration

### Restarting windows

the module exposes win32 primitives such as:

- **ExitWindows**: logoff
- **ExitWindowsEx**: logoff, shutdown, restart
- **OpenProcessToken**: get the access token of the user owning the current
  process.
- **AdjustTokenPrivileges**: update the privileges of a given user
- **GetTokenInformation**: read the privileges of a given user (and much more
  like groups, etc.)

So you can do this script to restart windows:

```ts
import { user, sspi } from 'node-expose-sspi';

// get the user token.
const accessToken = sspi.OpenProcessToken(['TOKEN_ALL_ACCESS']);

// give itself the privilege for restarting windows.
user.AdjustTokenPrivileges({
  accessToken,
  disableAllPrivileges: false,
  newState: {
    SeShutdownPrivilege: ['SE_PRIVILEGE_ENABLED'],
  },
});

// read the privileges
const ownerPrivileges = sspi.GetTokenInformation({
  accessToken: accessToken,
  tokenInformationClass: 'TokenPrivileges',
});
console.log('ownerPrivileges: ', ownerPrivileges);

// To let us see the logs before restarting
console.log('about to restart in 2s');
setTimeout(() => {
  user.ExitWindowsEx({
    flag: 'EWX_REBOOT',
    reason: ['SHTDN_REASON_FLAG_PLANNED', 'SHTDN_REASON_MINOR_HUNG'],
  });
}, 2000);
```

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
