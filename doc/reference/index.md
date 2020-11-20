# node-expose-sspi: Reference Guide

## Summary

- SSO
  - [on server side](#On-server-side)
  - [on client side](#On-client-side)
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
- `setSSP(ssp: SecuritySupportProvider)`: set the SecuritySupportProvider. A
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

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
