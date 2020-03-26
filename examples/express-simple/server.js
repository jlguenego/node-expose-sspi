const express = require('express');
const { sso } = require('../..');

sso.config.debug = false;

(async () => {
  await sso.init();

  const app = express();
  app.use(sso.auth());

  app.use((req, res, next) => {
    res.json({
      sso: req.sso,
    });
  });

  app.listen(3000, () => console.log('Server started on port 3000'));
})();
