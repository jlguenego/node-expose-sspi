# node-expose-sspi: Reference Guide

## Summary

- SSO
  - on server side
  - [on client side](#On-client-side)
- C++ Addons
  - ADSI
  - NETAPI
  - SSPI
  - SYSINFO

## SSO

### On client side

If you have a server with SSO, you can use it with a traditionnal browser (Chrome, Edge, Firefox, etc.) 
but also with a client utility of the `node-expose-sspi` module.

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
- `setCredentials(domain: string, user: string, password: string)`: connect with the credential of another windows account.
- `setSSP(ssp: SecuritySupportProvider)`: set the SecuritySupportProvider. A SecuritySupportProvider is just one of the following strings:
  - NTLM
  - Kerberos
  - Negotiate
- `setTargetName(SPN: string)`: only useful for Kerberos protocol. The Kerberos client needs to know exactly the SPN of the server. It is calculated by default like Chrome, Edge, etc. but sometimes, you need to indicate it yourself because the default calculation may not be what is expected.

#### Example

See:
- [client](../../examples/client)
- [client-runas](../../examples/client-runas)

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
