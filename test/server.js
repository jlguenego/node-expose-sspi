const express = require("express");
const sspi = require("..");

global.debug = true;

const app = express();

app.use(sspi.ssoAuth());

app.use((req, res, next) => {
  res.json({
    user: req.user,
    owner: req.owner
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
