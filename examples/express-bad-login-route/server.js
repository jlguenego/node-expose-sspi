const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();
app.use(sso.auth());

app.use((req, res) => {
  res.json({
    sso: req.sso,
  });
});

app.use((err, req, res, next) => {
  if (err.message.startsWith('SEC_E_LOGON_DENIED')) {
    // do what you want here
    return res.status(200).send({ msg: 'bad login' });
  }
  next(err);
});

app.listen(3000, () => console.log('Server started on port 3000'));
