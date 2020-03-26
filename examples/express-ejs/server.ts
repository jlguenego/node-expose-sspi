import express = require("express");
import path = require("path");
import session = require("express-session");
import { sspi, sso } from "node-expose-sspi";
import serveIndex = require("serve-index");

sso.config.debug = true;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "this is my super secreeeeeet!!!!!",
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
  const domain = sso.getDefaultDomain();
  console.log("domain: ", domain);

  const credentials: UserCredential = {
    domain,
    user: req.body.login,
    password: req.body.password
  };
  console.log("credentials: ", credentials);
  const ssoObject = sso.connect(credentials);
  if (ssoObject) {
    req.session.user = ssoObject.user;
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

app.get("/sso", sso.auth(), (req, res) => {
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
