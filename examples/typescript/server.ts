import express = require('express');
import { sso } from 'node-expose-sspi';

const app = express();

app.use(
  sso.auth({
    useGroups: true,
    useOwner: false,
    useActiveDirectory: true,
    useCookies: false,
    // groupFilterRegex: ".*NT AUTHORITY.*"
  })
);

app.use((req, res) => {
  res.json({
    sso: req.sso,
  });
});

app.listen(3001, () => console.log('Server started on port 3001'));
