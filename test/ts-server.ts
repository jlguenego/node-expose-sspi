import express = require("express");
import sspi = require("..");

// global.debug = true;

const app = express();

app.use(sspi.ssoAuth({ toto: 123 }));

app.use((req: sspi.Request, res, next) => {
  res.json({
    user: req.user,
    owner: req.owner
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
