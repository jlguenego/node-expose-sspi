import dbg from 'debug';
import express from 'express';
import session from 'express-session';
import { sso, UserCredential } from 'node-expose-sspi';
import path from 'path';
import serveIndex from 'serve-index';

const debug = dbg('node-expose-sspi:test');

declare module 'express-session' {
  interface SessionData {
    user: unknown;
    error: string;
  }
}

const wwwDir = path.resolve(__dirname, '.');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'this is my super secreeeeeet!!!!!',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  debug('home');
  return res.render('home', { user: req.session.user });
});

app.get('/login', (req, res) => {
  debug('login');
  const obj = { error: req.session.error };
  req.session.error = undefined;
  res.render('login', obj);
});

app.post('/action/connect', async (req, res) => {
  debug('connect', req.body);
  const domain = sso.getDefaultDomain();
  debug('domain: ', domain);

  const credentials: UserCredential = {
    domain,
    user: req.body.login,
    password: req.body.password,
  };
  debug('credentials: ', credentials);
  const ssoObject = await sso.connect(credentials);
  if (ssoObject) {
    req.session.user = ssoObject.user;
    return res.redirect('/protected/welcome');
  }
  req.session.error = 'bad login/password.';
  return res.redirect('/login');
});

app.get('/action/disconnect', (req, res) => {
  debug('disconnect');
  req.session.user = undefined;
  return res.redirect('/');
});

app.get('/no-sso', (req, res) => {
  return res.render('no-sso');
});

app.get('/sso', sso.auth(), (req, res) => {
  debug('sso');
  if (!req.sso) {
    return res.redirect('/no-sso');
  }
  req.session.user = req.sso.user;
  return res.redirect('/protected/welcome');
});

app.use('/protected', (req, res, next) => {
  debug('protected');
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
});

app.get('/protected/welcome', (req, res) => {
  debug('welcome', req.session.user);
  return res.render('welcome', { user: req.session.user });
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(3000, () => console.log('Server started on port 3000'));
