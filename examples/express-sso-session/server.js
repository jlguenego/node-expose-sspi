const express = require('express');
const { sso } = require('node-expose-sspi');
const session = require('express-session');

const app = express();
app.use(
  session({
    name: 'express-sso-session',
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
  })
);

app.use(sso.auth({ useSession: true }));

app.use((req, res) => {
  res.json({
    sso: req.session.sso,
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
