const express = require("express");
const path = require("path");
const session = require("express-session");
const sspi = require("..");

// global.debug = true;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/login", (req, res) => {
  console.log("login");
  return res.render("login");
});

app.get("/no-sso", (req, res) => {
  return res.render("no-sso");
});

app.get("/sso", sspi.ssoAuth(), (req, res) => {
  console.log("sso");
  if (!req.sso) {
    return res.redirect("/no-sso");
  }
  req.session.sso = req.sso;
  return res.redirect("/welcome");
});

app.get("/style.css", (req, res, next) => {
  console.log("style");
  res.sendFile(path.resolve(__dirname, "style.css"));
});

app.use((req, res, next) => {
  console.log("oooooooooooooooooooooooooooooooo");
  if (!req.session.sso) {
    return res.redirect("/login");
  }
  next();
});

app.get("/welcome", (req, res) => {
  console.log("welcome", req.session.sso);
  return res.render("welcome", { user: req.session.sso.user });
});

app.use(express.static(path.resolve(__dirname, ".")));

app.listen(3000, () => console.log("Server started on port 3000"));
