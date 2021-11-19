const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const router = require("./routes");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // expires: new Date(Date.now() + (30 * 86400 * 1000)),
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use("/", router);

app.listen(port, () => {
  console.log(`Go to ${port}`);
});