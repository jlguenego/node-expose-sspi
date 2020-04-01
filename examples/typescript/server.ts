import express = require('express');
import { sso } from 'node-expose-sspi';

const app = express();

app.use(
  sso.auth({ useGroups: false, useOwner: false, useActiveDirectory: false })
);

app.use((req, res, next) => {
  res.json({
    sso: req.sso,
  });
});

app.listen(3001, () => console.log('Server started on port 3001'));
