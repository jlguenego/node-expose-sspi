# Authentication Error Analysis

- If you do not see anything useful here to solve your problem, then do not hesitate to raise an issue.
- If you did not understood well something a documentation, please help to improve.

[See also the use case informations](../use-case/)

## Summary

- SSO authentication client use case:
  - [Cannot get Kerberos on localhost](##Cannot-get-Kerberos-on-localhost)

## Cannot get Kerberos on localhost

You cannot get Kerberos on localhost with traditionnal browsers (Chrome, Edge, Firefox, etc.), because they have a non configurable algorithm to get the Service Principal Name.

If you really want to test Kerberos authentication on localhost, you need:

- to have your computer joined to a windows domain and domain controler is reachable.
- to configure the server SPN (Service Principal Name) with `HTTP/localhost` on the windows account that run the HTTP server.
- to run the SSO client of the `node-expose-sspi` module, instead of a traditionnal browser.

For instance, let say your windows computer is joined to the NETBIOS `JLG` domain and your account is `jlouis`.

**step 1**

Check that you are on a domain and domain controller is reachable.

```
cd node_modules
cd node-expose-sspi
npm run status
```

You should see:

```
status:  {
  ...
  isOnDomain: true,
  domain: 'JLG',
  isActiveDirectoryReachable: true
}
```

**step 2**

Checking the `HTTP/localhost` SPN is added on the domain.

Please check that `HTTP/localhost` is not already a spn:

```
setspn -Q HTTP/localhost
```

If you see

```
Checking domain DC=jlg,DC=local

No such SPN found.
```

Then add the SPN with:

```
setspn -S HTTP/localhost JLG\jlouis
```

**step 3**

Start a server with SSO, for instance on url `http://localhost:3000`.

Run the `node-expose-sspi` SSO client with a script like this one.

```
const { sso } = require('node-expose-sspi');

const client = new sso.Client();
client.setSSP('Kerberos');
const response = await client.fetch('http://localhost:3000');
const json = await response.json();
```

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
