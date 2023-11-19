const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("express-async-handler");
const userController = require("../controllers/usercontroller");

router.route("/register").post(catchAsync(userController.registerUser));
router
  .route("/login")
  .post(
    passport.authenticate("local", {
      failureRedirect: "/auth/login",
    }),
    catchAsync(userController.loginUser)
  )
  .get((req, res) => {
    res.status(401).send("Unable to send the request");
  });
module.exports = router;
