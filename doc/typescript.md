# Typescript

The module `node-expose-sspi` can be used with Typescript.

Modules needed for this example:
```
npm i typescript ts-node express @types/express
```

Here is the `server.ts` script to write:

```typescript
import express = require("express");
import { sso } from "node-expose-sspi";

const app = express();

app.use(sso.auth());

app.use((req, res, next) => {
  res.json({
    sso: req.sso
  });
});

app.listen(3001, () => console.log("Server started on port 3001"));
```

To start the typescript server, just run:
```
npx ts-node server.ts
```

