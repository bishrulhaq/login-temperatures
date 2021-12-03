const home = (req, res) => {
    res.render('index', {title: 'Home'});
}

const register = (req, res) => {
    res.render('register', {title: 'Register'});
}

const login = (req, res) => {
    res.render('login', {title: 'Login'});
}

module.exports = {home, register, login}