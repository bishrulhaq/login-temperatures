const passport = require("passport");
const {check, validationResult} = require('express-validator');

const getLoginPage = (req, res) => {
    return res.render("login.ejs", {title: 'Home'});
};

const handleLogin = (req, res, next) => {

    // Validation Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }

    passport.authenticate("localLogin", (error, user, info) => {
        if (error) {
            return res.status(500).json({message: error});
        }
        if (!user) {
            return res.status(401).json({message: info.message});
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({message: error});
            } else {
                return res.status(200).json({message: user.username});
            }
        });
    })(req, res, next);
};

const checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

const checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

const postLogOut = (req, res) => {
    req.session.destroy((err) => {
        return res.redirect("/login");
    });
};

module.exports = {getLoginPage, handleLogin, checkLoggedIn, checkLoggedOut, postLogOut};