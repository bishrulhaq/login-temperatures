const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const HomeController = require("../controllers/HomeController");
const initPassportAuth = require("../controllers/AuthController.js");

initPassportAuth();

const router = express.Router();

const mainRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, HomeController.home);
    router.post("/logout", loginController.postLogOut);
    router.get("/register", registerController.getRegisterPage);
    router.post("/register-user", registerController.createNewUser);
    router.get("/login", loginController.checkLoggedOut, loginController.getLoginPage);
    router.post("/login", loginController.handleLogin);
    return app.use("/", router);
};

module.exports = mainRoutes;