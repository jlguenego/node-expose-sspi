# Client use case

## Example

Create a node module:

```
mkdir project
cd project
npm init -y
npm i express node-expose-sspi
```


### Test Server

First we need an HTTP server that wants to authenticate with a **Negotiate** protocol (NTLM and Kerberos).
By chance, we can have one with `node-expose-sspi`.

Note: If you have already your own server, you don't need this one.

Create the `server.js`:

```js
const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();

app.use(sso.auth());

app.use((req, res) => {
  res.json({
    sso: req.sso.user.displayName,
  });
});

app.listen(3000, () =>
  console.log('Server started on port 3000')
);

```

### Client

Create an `client.js` script with the following content:

```js
const { sso } = require('node-expose-sspi');

(async () => {
  try {
    const response = await new sso.Client().fetch('http://localhost:3000');
    const json = await response.json();
    console.log('json: ', json);
  } catch (e) {
    console.error(e);
  }
})();
```

### Running

You need a first terminal for the server, and second one for running the client.

#### First Terminal
```sh
node server.js
```

The script output:

```
Server started on port 3000
```

#### Second terminal
```sh
node client.js
```

You should have this output:
```
json:  { sso: 'Jean-Louis GUÉNÉGO' }
```

Of course, this will be your windows account display name. Not mine :smile:

## The client object

`sso.Client` is a Javascript class with `fetch` method.

The `sso.Client.fetch` method exactly runs as the `node-fetch` utility, which was completed by:
- Negotiate protocol
- Cookies management

Thanks to the 
[node-fetch](https://github.com/node-fetch/node-fetch) project.

More information on the
[fetch API on the MDN website](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
