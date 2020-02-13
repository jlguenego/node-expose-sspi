const express = require("express");
const path = require("path");
const session = require("express-session");
const sspi = require("..");
const serveIndex = require("serve-index");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  console.log("home");
  return res.render("home", { user: req.session.user });
});

app.get("/login", (req, res) => {
  console.log("login");
  const obj = { error: req.session.error };
  req.session.error = undefined;
  res.render("login", obj);
});

app.post("/action/connect", (req, res) => {
  console.log("connect", req.body);
  const domain = sspi.getDefaultDomain();
  console.log('domain: ', domain);

  const credentials = {
    domain,
    user: req.body.login,
    password: req.body.password
  };
  console.log("credentials: ", credentials);
  const sso = sspi.connect(credentials);
  if (sso) {
    req.session.user = sso.user;
    return res.redirect("/protected/welcome");
  }
  req.session.error = "bad login/password.";
  return res.redirect("/login");
});

app.get("/action/disconnect", (req, res) => {
  console.log("disconnect");
  req.session.user = undefined;
  return res.redirect("/");
});

app.get("/no-sso", (req, res) => {
  return res.render("no-sso");
});

app.get("/sso", sspi.ssoAuth(), (req, res) => {
  console.log("sso");
  if (!req.sso) {
    return res.redirect("/no-sso");
  }
  req.session.user = req.sso.user;
  return res.redirect("/protected/welcome");
});

app.use("/protected", (req, res, next) => {
  console.log("protected");
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});

app.get("/protected/welcome", (req, res) => {
  console.log("welcome", req.session.user);
  return res.render("welcome", { user: req.session.user });
});

app.use(express.static(path.resolve(__dirname, ".")));
app.use(serveIndex(path.resolve(__dirname, "."), { icons: true }));

app.listen(3000, () => console.log("Server started on port 3000"));
