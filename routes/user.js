const express = require("express");
const router = express.Router();
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")

// Auth Limiter - 5 attempts per 15 minutes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login/signup attempts, please try again later.",
    skipSuccessfulRequests: true,
});

// GET Signup Page and  POST Signup Form
router.route("/signup")
.get(userController.renderSignup )
.post(authLimiter, wrapAsync(userController.signup));


// GET Login Page and // POST Login Form
router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl,
    authLimiter,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login);

// LOGOUT Route
router.get("/logout", userController.logout);

// Privacy Policy Route
router.get("/privacy", (req, res) => {
    res.render("legal/privacy");
});

// Terms of Service Route
router.get("/terms", (req, res) => {
    res.render("legal/terms");
});

module.exports = router;
