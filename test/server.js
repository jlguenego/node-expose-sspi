const express = require("express");
const sspi = require("..");

const app = express();

app.use(sspi.auth());

app.use((req, res, next) => {
  res.json({
    connexion: req.user,
    owner: req.owner,
    groups: req.groups
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
