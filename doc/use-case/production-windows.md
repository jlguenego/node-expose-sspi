# Node server behind a IIS reverse proxy

In this example, we discuss how to setup a production system using a
[reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) with [SSL offloading](https://en.wikipedia.org/wiki/TLS_termination_proxy).

Purpose is to expose the website `http://kiki` or `http://kiki.jlg.local` that will be in fact `http://musette:3000`.

## Infrastructure

You need to have many hosts:
- `reverse-proxy-host`: A Windows Server OS running the following features:
  - AD DS (Active Directory Domain Controller)
  - DNS
  - IIS
- `server-host`: A Windows 10 OS running:
  - nodejs and npm
  - a server running `node-expose-sspi`
- `client-host`: A Windows 10 OS running
  - Chrome, or Firefox, or Edge

For this example, let say the domain name is:
- jlg.local (NETBIOS: JLG)

Suppose we have two Windows domain accounts:
- `marcel@jlg.local`: a user account for client.
- `erp@jlg.local`: a user account for server.
Please create the above accounts on the domain controller (AD DS).

For this example, let say that all host have a name:
- `reverse-proxy-host`: `jlgdc01` (`192.168.1.216`)
- `server-host`: `musette`
- `client-host`: `chouchou`


## Configuring server-host

```
mkdir myserver
cd myserver
npm init -y
npm i node-expose-sspi express
```

create a `server.js` file in the `myserver` directory:
```js
const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();

app.use(sso.auth());

app.use((req, res) => {
  res.json({
    method: req.sso.method,
    displayName: req.sso.user.displayName,
  });
});

app.listen(3000, () =>
  console.log('Server started on port 3000')
);
```

You need to be connected as a Window Domain user.

Start the server:
```cmd
node server.js
```

Test the server locally:
```cmd
start chrome http://musette:3000
```

You should see something like this:
```cmd
{
  "method": "NTLM",
  "displayName": "<your-account-name>"
}
```

## Configuring reverse-proxy-host

You need to configure the DNS via an app called *DNS Manager*:
- under the domain zone, add a Host(A) rule: `kiki` -> `192.168.1.216`

It means that `jlgdc01` and `kiki` means the same machine: the reverse-proxy-host.

You need to configure IIS as a reverse proxy via *IIS Manager*:
- look at this [microsoft documentation](https://docs.microsoft.com/fr-fr/archive/blogs/friis/setup-iis-with-url-rewrite-as-a-reverse-proxy-for-real-world-apps)
- install `URL Rewrite`
- add a reverse proxy rule to redirect `http://kiki` to `http://musette:3000`.

It is better to use *Kerberos*, so you need to add a *Service Principal Name* to the `erp@jlg.local` user. Open `Active Directory Users and Computers`:
- make sure you have the *Advanced Features* view.
- open the `erp@jlg.local` user.
- open the *Attribute Editor* tab. and edit the *Service Principal Name*:
  - add `HTTP/kiki` and `HTTP/kiki.jlg.local` SPN.

## Testing from client-host

Login to the Window machine as `marcel@jlg.local`.

Both below commands should work:

```cmd
start chrome http://kiki.jlg.local
```

```cmd
start chrome http://kiki
```

You should see something like this:
```cmd
{
  "method": "Kerberos",
  "displayName": "marcel"
}
```

If Kerberos is not well configured, then the browser will try to connect using *NTLM*. In this case, you will probably have a dialog box asking for credentials, which is bad user experience...


## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
