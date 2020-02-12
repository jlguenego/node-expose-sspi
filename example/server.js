const express = require("express");
const jwt = require("express-jwt");
const path = require("path");
const sspi = require("..");

// global.debug = true;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.get("/login", (req, res) => {
  console.log("login");
  return res.render("login");
});

app.get("/sso", sspi.ssoAuth(), (req, res) => {
  console.log("sso");
  res.json({
    sso: req.sso
  });
});

app.use(express.static(path.resolve(__dirname, ".")));

// app.use(jwt({ secret: "this is my server secret" }));

// app.use((req, res, next) => {
//   if (req.user) {
//     if (req.url !== "/welcome") {
//       return res.redirect("/welcome");
//     }
//     return res.render("./views/welcome", { user: req.user });
//   }
//   return res.redirect("/login");
// });

// app.use((err, req, res, next) => {
//   if (err.status === 401) {
//     return res.redirect("/login");
//   }
// });

// app.use(sspi.ssoAuth());

// app.use((req, res, next) => {
//   res.json({
//     sso: req.sso
//   });
// });

app.listen(3000, () => console.log("Server started on port 3000"));
