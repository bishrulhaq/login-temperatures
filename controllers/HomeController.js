const passport = require('passport');

const home = (req, res) => {
    res.render('index', {title: 'Home', user: req.user});
};

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
};

const isNotLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated())
        return res.redirect('/');
    return next();
};

module.exports = {home, isLoggedIn, isNotLoggedIn};