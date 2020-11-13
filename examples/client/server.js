const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();

app.use(sso.auth());

app.use((req, res) => {
  res.json({
    method: req.sso.method,
    displayName: req.sso.user.displayName,
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
