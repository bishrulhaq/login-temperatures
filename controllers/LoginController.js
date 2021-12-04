const passport = require("passport");

const getLoginPage = (req, res) => {
    return res.render("login.ejs", {title: 'Home'});
};

const handleLogin = (req, res, next) => {
    passport.authenticate("localLogin", (error, user, info) => {
        if (error) {
            return res.status(500).json(error);
        }
        if (!user) {
            return res.status(401).json(info.message);
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(user);
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