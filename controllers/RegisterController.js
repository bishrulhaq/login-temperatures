const registerService = require("../services/registerServices");
const {check, validationResult} = require('express-validator');

const getRegisterPage = (req, res) => {
    return res.render("register.ejs", {title: 'Home'});
};

const createNewUser = async (req, res) => {

    // Validation Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }

    try {
        const data = {
            username: req.body.username,
            password: req.body.password
        };

        await registerService.createNewUser(data);
        return res.status(200).json({message: "Successfully Created!"})
    } catch (e) {
        return res.status(500).json({message: e});
    }
};

module.exports = {getRegisterPage, createNewUser};