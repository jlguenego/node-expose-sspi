# Typescript

The module `node-expose-sspi` can be used with Typescript.

Modules needed for this example:
```
npm i typescript ts-node express @types/express
```

Here is the `server.ts` script to write:

```js
import express = require("express");
import sspi = require("node-expose-sspi");

// global.debug = true;

const app = express();

app.use(sspi.ssoAuth());

app.use((req, res, next) => {
  res.json({
    sso: req.sso
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
```

To start the typescript server, just run:
```
npx ts-node server.ts
```

