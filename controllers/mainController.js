const home = (req, res) => {
    res.render('index', {title: 'Home'});
};

const register = (req, res) => {
    res.render('register', {title: 'Register', message: req.flash('registerMessage')});
};

const login = (req, res) => {
    res.render('login', {title: 'Login', message: req.flash('loginMessage')});
};

const loginSubmit = (req, res) => {
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
        req.session.cookie.expires = false;
    }
    res.redirect('/');
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

module.exports = {home, register, login, loginSubmit, isLoggedIn,isNotLoggedIn};