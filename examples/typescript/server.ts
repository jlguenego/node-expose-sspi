import express = require('express');
import { sso } from '../../src';

(async (): Promise<void> => {
  await sso.init();
  const app = express();

  app.use(
    sso.auth({ useGroups: true, useOwner: false, useActiveDirectory: true, useCookies: true })
  );

  app.use((req, res) => {
    res.json({
      sso: req.sso,
    });
  });

  app.listen(3001, () => console.log('Server started on port 3001'));
})();
