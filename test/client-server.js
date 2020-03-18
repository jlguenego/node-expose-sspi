const express = require('express');
const { sso } = require('node-expose-sspi');

sso.config.debug = false;

const app = express();

app.use(sso.auth());

app.use((req, res, next) => {
  res.json({
    sso: req.sso
  });
});

const server = app.listen(3000, () => console.log('Server started on port 3000'));

(async () => {
  try {
    const { fetch } = sso.client;
    const response = await fetch('http://localhost:3000');
    const json = await response.json();
    console.log('json: ', json);
  } catch (e) {
    console.error(e);
  }

  server.close(() => console.log('Server successfully closed.'));
})();
