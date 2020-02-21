# node-expose-sspi

Expose the Microsoft Windows SSPI (SSP Interface) to [Node.js®](https://nodejs.org/).

It has been done in order to do NTLM and Kerberos SSO authentication.

You may participate to complete this project if you need to use SSPI in another use case.

This module works only on Microsoft Windows OS.

## Install

Just do:

```
npm i node-expose-sspi
```

Note: There is a prebuilt binary node addon that will be installed.

## Usage

### SSO Authentication use case

```bat
mkdir myproject
cd myproject
npm init -y
npm i express
npm i node-expose-sspi
```

Make an express web server by doing the `server.js` file:

```js
const express = require("express");
const { sso, sspi } = require("node-expose-sspi");

sso.config.debug = false;

const app = express();

app.use(sso.auth());

app.use((req, res, next) => {
  res.json({
    sso: req.sso
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
```

```
node server.js
```

Open a web browser and go to `http://localhost:3001`.

You should see the JSON result with user, owner and used method (NTLM or Kerberos)

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

Note: You may need a proper C++ Windows Toolchain installed.
One way to do it is to install this module:

```
npm install --global windows-build-tools
```

## Test and Example

To run the test and the example, just clone this project.

```
git clone https://github.com/jlguenego/node-expose-sspi.git
cd node-expose-sspi
npm i
npm test
npm run example
```

## Development

To compile the native node module, you need:
```
npm install --global windows-build-tools
git clone https://github.com/jlguenego/node-expose-sspi.git
cd node-expose-sspi
npm run build
```

## Angular example

See the Github repository:
https://github.com/jlguenego/angular-sso-example


## TODO

- Typing flags

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com> (http://jlg-consulting.com/)
