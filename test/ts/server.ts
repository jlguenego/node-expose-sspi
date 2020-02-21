import express = require("express");
import { sso } from "../..";

sso.config.debug = true;

const app = express();

app.use(sso.auth());

app.use((req, res, next) => {
  res.json({
    sso: req.sso
  });
});

app.listen(3001, () => console.log("Server started on port 3001"));
