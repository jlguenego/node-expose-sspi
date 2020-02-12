# Typescript

The module `node-expose-sspi` can be used with Typescript.

Modules needed for this example:
```
npm i typescript ts-node express @types/express
```

Here is the `server.ts` script to write:

```
import express = require("express");
import sspi = require("node-expose-sspi");

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

