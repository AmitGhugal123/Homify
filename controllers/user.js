const User = require("../models/user.js");

// GET Signup Page
module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

// POST Signup Form
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        // Prevent empty/space-only usernames
        username = username.trim();
        if (!username || /\s/.test(username)) {
            req.flash("error", "Username cannot contain spaces or be empty.");
            return res.redirect("/signup");
        }

        // Create and register user
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // Optional: log the registered user
        console.log(registeredUser);

        // Automatically login after signup
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Homify!"); // new flash message
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

// GET Login Page
module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

// POST Login Form
module.exports.login = async (req, res) => {
    req.flash("success", "Logged in successfully!");
    const redirectUrl = res.locals.redirectUrl;
    delete req.session.redirectUrl; // clear after redirect
    res.redirect(redirectUrl);
}

// LOGOUT Route
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
}