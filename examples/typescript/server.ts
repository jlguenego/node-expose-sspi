import express from 'express';
import session from 'express-session';
import { sso } from 'node-expose-sspi';

const app = express();

app.use(
  session({
    name: 'express-sso-session',
    resave: false,
    saveUninitialized: true,
    secret: 'voila...',
  })
);

app.use(
  sso.auth({
    useGroups: true,
    useOwner: true,
    useActiveDirectory: true,
    useCookies: true,
    allowsAnonymousLogon: false,
    allowsGuest: false,
    useSession: true,
    // groupFilterRegex: ".*NT AUTHORITY.*"
  })
);

app.use((req, res) => {
  res.json({
    sso: req?.session?.sso || req.sso,
  });
});

app.listen(3001, () => console.log('Server started on port 3001'));
