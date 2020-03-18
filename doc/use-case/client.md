# Client use case

## Example

Create a node module:

```
mkdir project
cd project
npm init -y
npm i express node-expose-sspi
```

Create a `index.js` script with the following content:

```js
const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();

app.use(sso.auth());

app.use((req, res, next) => {
  res.json({
    sso: req.sso.user.displayName
  });
});

const server = app.listen(3000, () => console.log('Server started on port 3000'));

(async () => {
  try {
    const { fetch } = sso.client;
    const response = await fetch('http://localhost:3000');
    const json = await response.json();
    console.log('json: ', json);
  } catch (e) {
    console.error(e);
  }

  server.close(() => console.log('Server successfully closed.'));
})();

```

And to run it, just do:

```
node index.js
```

The script output:

```
Server started on port 3000
json:  { sso: 'Jean-Louis GUÉNÉGO' }
Server successfully closed.
```

Of course, `Jean-Louis GUÉNÉGO` is whatever your windows account is.

## The client object

`sso.client.fetch` is a `fetch` API from the node module [node-fetch](https://github.com/node-fetch/node-fetch), with the Windows Authentication Integration.

More information on the [fetch API on the MDN website](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>