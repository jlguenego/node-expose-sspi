# node-expose-sspi

Expose to the javascript node world the Microsoft Windows SSPI (SSP Interface).

It has been done in order to do NTLM and Kerberos SSO authentication.
You may participate to complete this project if you need to use SSPI in another use case.

This module works only on Microsoft Windows OS.

## Install

Just do:

```
npm i node-expose-sspi
```

Note: There is a prebuilt binary that will be installed (Node addon).

## Usage

### SSO Authentication use case

```
mkdir myproject
cd myproject
npm init -y
npm i express
npm i node-expose-sspi
```

Make an express web server by doing the `server.js` file:

```
const express = require("express");
const sspi = require("node-expose-sspi");

// global.debug = true;

const app = express();

app.use(sspi.ssoAuth());

app.use((req, res, next) => {
  res.json({
    user: req.user,
    owner: req.owner
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
```

```
node server.js
```

Open a web browser and go to `http://localhost:3000`

#### Typescript

This module is also integrated with Typescript.

[Typescript example](./doc/typescript.md)

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

You may see for instance [this tutorial for details about how to set up a domain](https://www.tenforums.com/tutorials/51456-windows-server-2016-setup-local-domain-controller.html).



On Microsft Windows Server 2016, make a Active Directory Domain Controller (AD DC).
Call it for instance jlg.local (NETBIOS: JLG)

Declare two real domain users on AD DC:
- login: jlouis
- login: suzana

The webserver will be run with another account. Create it as well:

- login: spookyweb
- login NETBIOS : JLG\SPOOKYWEB
- password (example): Toto123!
- Password must not expire.

Set two Service Principal Names (SPN) on this wpookyweb account:
```
setspn -a HTTP/spooky.jlg.local JLG\SPOOKYWEB
setspn -a HTTP/spooky JLG\SPOOKYWEB
```

Start the server on `spooky` host with the user JLG\SPOOKYWEB.
```
runas /user:JLG\SPOOKYWS cmd
password: Toto123!

cd <myproject>
node server.js
```

Go on the `fifi` host. Log as `jlouis`.
Make sure the browser is configured. For Chrome, you need to add
the website domain name to the advanced list of local intranet sites.

For that, open

`Control Panel > Network and Internet > Internet options`.

Then go on 

`Security > Local Intranet > Sites > Advanced`


Add two websites to the list:
- spooky
- spooky.jlg.local

No need to specify any port.

Then go on your `fifi` Chrome, and run `http://spooky:3000` or `http://spooky.jlg.local:3000`

The SSO authentication should be in Kerberos. If you set in the `server.js` file

```
global.debug = true;
```
You should see the token exchanged and the protocol name used (Kerberos).


## Rebuilding the binary

If the provided Windows binary does not work for your OS,
You can rebuild the Node addon binary:

```
cd .\node_modules\node-expose-sspi
npm run build
```

Note: You may need a proper C++ Windows Toolchain installed.
One way to do it is to install this module:

```
npm install --global windows-build-tools
```


## Develop

To compile the native node module, you need:
```
npm install --global windows-build-tools
```


## TODO

- Typescript


## Author

Jean-Louis GUENEGO <jlguenego@gmail.com> (http://jlg-consulting.com/)
