const express = require('express');
const passport = require('passport')
const mainController = require('../controllers/mainController');
const router = express.Router();

// Home Route
router.get('/', mainController.home);

// Login Route
router.get('/login', mainController.isNotLoggedIn, mainController.login);

// Login Form Submission
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), mainController.loginSubmit);

// Register Route
router.get('/register', mainController.isNotLoggedIn, mainController.register);

// Register Form Submission
router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));

module.exports = router;