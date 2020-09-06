import express from 'express';
import { sso } from 'node-expose-sspi';

const app = express();
app.use(sso.auth());

app.use((req, res) => {
  res.json({
    sso: req.sso,
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
