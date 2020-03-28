# Express simple example

To authenticate with SSO, just use the middleware `sso.auth()`.

Simple !

The `server.js` file:

```
const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();
app.use(sso.auth());

app.use((req, res, next) => {
  res.json({
    sso: req.sso,
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));

```

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>