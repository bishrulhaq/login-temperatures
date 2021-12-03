const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router();

// Home Route
router.get('/', mainController.home);

// Login Route
router.get('/login', mainController.login);

// Register Route
router.get('/register', mainController.register);

module.exports = router;