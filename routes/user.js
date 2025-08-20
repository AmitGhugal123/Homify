const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")

// GET Signup Page and  POST Signup Form
router.route("/signup")
.get(userController.renderSignup )
.post(wrapAsync(userController.signup));


// GET Login Page and // POST Login Form
router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login);

// LOGOUT Route
router.get("/logout", userController.logout);

module.exports = router;
