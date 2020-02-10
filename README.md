# node-expose-sspi

Expose to the javascript node world the Microsoft Windows SSPI (SSP Interface).

It has been done in order to do NTLM and Kerberos SSO authentication.
You may participate to complete this project if you need to use SSPI in another use case.

This module works only on Microsoft Windows OS.

## Install

```
npm i node-expose-sspi
```

## Usage

### SSO Authentication use case

Make an express web server by doing the `server.js` file:

```
const express = require("express");
const sspi = require("node-expose-sspi");

// global.debug = true;

const app = express();

app.use(sspi.ssoAuth());

app.use((req, res, next) => {
  res.json({
    connection: req.user.name,
    owner: req.owner.name,
    groups: req.user.groups
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
```

```
node server.js
```

Open a web browser and go to `http://localhost:3000`

#### NTLM

If you are not on a Microsoft Windows Active Directory Domain, it will use the NLTM authentication protocol.

Note: the NTLM protocol is not very secure.

#### Kerberos

If you want to do a SSO authentication using Kerberos, you must be on a Microsoft Windows Domain.
So first make sure your computer is part of a domain.
The browser and the server must be on different machines. If not, the NTLM protocol will be used.
I did not find why there is this restriction.


To make a full working example on a laptop (for demo), 
you could run :
- one VM with a Microsft Windows Server 2016 (hostname: JLGDC01),
- two VM with Microsoft Windows 10 (hostname: fifi and spooky).

On Microsft Windows Server 2016, make a Active Directory Domain Controller (AD DC).
Call it for instance jlg.local (NETBIOS: JLG)

Declare two real domain users on AD DC:
login: jlouis
login: suzana

The webserver will be run with another account. Create it as well:
login: spookyweb
login NETBIOS : JLG\SPOOKYWEB
password: Toto123!
Password must not expires.

Set two Service Principal Names (SPN) on this wpookyweb account:
```
setspn -a HTTP/spooky.jlg.local JLG\SPOOKYWEB
setspn -a HTTP/spooky JLG\SPOOKYWEB
```

Start the server on spooky machine with the user JLG\SPOOKYWEB.
```
runas /user:JLG\SPOOKYWS cmd
password: Toto123!

cd <the web server directory>
npm run server
```

Go on the fifi machine. Log as `jlouis`.
Setup the control panel > Network and Internet > Internet options.
Go on Security > Local Intranet > Sites > Advanced
Add two website to the list:
spooky
spooky.jlg.local

No need to add the port.


## Develop

To compile the native node module, you need:
```
npm install --global windows-build-tools
```


## TODO

- Typescript

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
