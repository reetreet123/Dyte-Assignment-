if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const bodyParser = require("body-parser");

const User = require("./models/userModel");
const port = process.env.PORT;
// Connecting to Mongo Atlas Database
require("./db").connectToMongoose();

app.use(session({ secret: process.env.sessionSec }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Allowing application to get JSON request body
app.use(bodyParser.json());

// Routes
const logsRoute = require("./routes/logsroute");
const userRoutes = require("./routes/userroute");

app.use("/logs", logsRoute);
app.use("/auth", userRoutes);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
