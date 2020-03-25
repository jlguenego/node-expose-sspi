# node-expose-sspi

Expose the Microsoft Windows SSPI (SSP Interface) to [Node.js®](https://nodejs.org/).

:smirk: It has been done in order to do **NTLM** and **Kerberos** SSO authentication.

Requirements: Microsoft Windows OS, NodeJS version >=12.16.1.

## Install

Just do:

```
npm i node-expose-sspi
```

Note: There is a prebuilt binary node addon that will be installed.

## Usage

### SSO Authentication server use case

```bat
mkdir myproject
cd myproject
npm init -y
npm i express
npm i node-expose-sspi
```

Make an express web server by doing the `server.js` file:

```js
const express = require('express');
const { sso, sspi } = require('node-expose-sspi');

sso.config.debug = false;

const app = express();

app.use(sso.auth());

app.use((req, res, next) => {
  res.json({
    sso: req.sso,
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
```

```
node server.js
```

Open a Google Chrome web browser and go to `http://localhost:3000`.

You should see the JSON result with user, owner and used method (NTLM or Kerberos).

Note: To read JSON file on Chrome, you should use the [JSON Formatter Chrome Extension](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa).

### SSO Authentication client use case

[See the example here.](./doc/use-case/client.md)

### SSO Authentication reverse proxy use case

Clone this project.

```
git clone https://github.com/jlguenego/node-expose-sspi.git
cd node-expose-sspi
npm i
npm run pretest
npm run test:proxy
```

The reverse proxy performs an authentication and gives the authentication info to the target server in the `x-sso` HTTP header.

## Browsers

### Chrome

No conf. It just works.

### Firefox

Unlike Chrome, NTLM and Kerberos are not activated by default in Firefox. To make it working, you need to follow these steps:

1. Navigate to the URL `about:config`.
2. Click past the warning of harmful consequences.
3. Type `negotiate-auth` into the filter at the top of the page, in order to remove most of the irrelevant settings from the list.
4. Double-click on `network.negotiate-auth.trusted-uris`. A dialogue box for editing the value should appear.
5. Enter the required hostname(s) and/or URL prefix(es) then click OK. For the above example, it is `http://localhost:3000`

[More detailed info here](http://www.microhowto.info/howto/configure_firefox_to_authenticate_using_spnego_and_kerberos.html).

### Edge

Edge does not require any configuration. But the browser ask the credentials to the user each time it is started.

## API

[Access to the detailed API document](./doc/api/README.md). This has been generated with [typedoc](https://github.com/TypeStrong/typedoc).

Do see the API in action, you should read the `sso` source code object. `auth` and `connect` functions are two instructive examples of how to use SSPI with NodeJS.

There is 2 parts in this module:

- `sspi` object which exposes the Microsoft SSPI library API.
- `sso` object, written in typescript/javascript with the following classes or functions:
  - `auth()`: express middleware finding the SSO logged user.
  - `connect({login, password, domain)`: connect with a MS Windows account login/password.
  - `new SSO(serverContextHandle)`: create a SSO object from a secure context handle.
  - `getDefaultDomain()`: get the windows domain/hostname where the server started.

#### Typescript

This module is also integrated with Typescript.

[Typescript example](./doc/typescript.md)

#### NTLM

If you are not on a Microsoft Windows Active Directory Domain, it will use the NLTM authentication protocol.

Note: the NTLM protocol is not very secure, so be sure to be above HTTPS.

#### Kerberos

You should see [this Node Expose SSPI Kerberos dedicated documentation](./doc/Kerberos.md).

## Rebuilding the binary

If the provided Windows binary does not work for your OS,
You can rebuild the Node addon binary:

```
cd .\node_modules\node-expose-sspi
npm run build
```

Note: You need a proper C++ Windows Toolchain installed.
One way to do it is to install this module:

```
npm install --global windows-build-tools
```

## Test and Example

To run the example, just clone this project.

```
git clone https://github.com/jlguenego/node-expose-sspi.git
cd node-expose-sspi
cd examples
cd express-ejs
npm i
npm start
```

Open a Google Chrome web browser and go to `http://localhost:3000`.

## Development

As a prerequisites, you need a C++ toolchain installed on your environment.

Open a **PowerShell command line as an administrator** and do :

```
npm i -g windows-build-tools
```

To compile the native node module, do the following:

```
git clone https://github.com/jlguenego/node-expose-sspi.git
cd node-expose-sspi
npm run build
```

## Angular example

See the Github repository:
https://github.com/jlguenego/angular-sso-example

## React example

See the Github repository:
https://github.com/jlguenego/react-sso-example

## Vue example

TODO

## TODO

Any idea of new features ? Please tell me and raise an issue. :blush:

- split sspi into {sspi, adsi, sysinfo}
- make some functions and methods async (promise)
- typedoc
- bring some account for cache

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com> (http://jlg-consulting.com/)

You may participate to complete this project if you need to use SSPI in another use case.
Contributors are welcome!
