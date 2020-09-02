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

const auth = sso.auth();

app.use(
  (req, res, next) => {
    if (!req.session.sso) {
      auth(req, res, next);
      return;
    }
    next();
  },
  (req, res, next) => {
    if (!req.session.sso && req.sso) {
      req.session.sso = req.sso;
    }
    next();
  }
);

app.use((req, res) => {
  res.json({
    sso: req.session.sso,
    ssoAuth: req.sso !== undefined,
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
