import express = require('express');
import { sso } from 'node-expose-sspi';

(async (): Promise<void> => {
  await sso.init();
  const app = express();

  app.use(
    sso.auth({ useGroups: true, useOwner: false, useActiveDirectory: true })
  );

  app.use((req, res) => {
    res.json({
      sso: req.sso,
    });
  });

  app.listen(3001, () => console.log('Server started on port 3001'));
})();
