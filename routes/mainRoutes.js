const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const HomeController = require("../controllers/HomeController");
const initPassportAuth = require("../controllers/AuthController");
const weatherController = require("../controllers/weatherController");
const {check, validationResult} = require('express-validator');

initPassportAuth();
const router = express.Router();

const mainRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, HomeController.home);
    router.post("/logout", loginController.postLogOut);
    router.get("/register", registerController.getRegisterPage);
    router.post("/register-user", [check('username').notEmpty(), check('password').notEmpty()], registerController.createNewUser);
    router.get("/login", loginController.checkLoggedOut, loginController.getLoginPage);
    router.post("/login", [check('username').notEmpty(), check('password').notEmpty()], loginController.handleLogin);
    router.get("/get-weather", weatherController.weatherDetails);
    return app.use("/", router);
};

module.exports = mainRoutes;