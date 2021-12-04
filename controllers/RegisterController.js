const registerService = require("../services/registerServices");

const getRegisterPage = (req, res) => {
    return res.render("register.ejs", {title: 'Home'});
};

const createNewUser = async (req, res) => {
    try {
        let data = {
            username: req.body.username,
            password: req.body.password
        };

        await registerService.createNewUser(data);
        return res.status(200).json({
            message: "User is Successfully Created!"
        })
    } catch (e) {
        return res.status(500).json(e);
    }
};

module.exports = {getRegisterPage, createNewUser};