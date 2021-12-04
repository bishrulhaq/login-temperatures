const connection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");

let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await checkUserName(user.username);
            if (check === false) {
                // hashing
                let salt = bcrypt.genSaltSync(10);
                let data = {
                    username: user.username,
                    password: bcrypt.hashSync(user.password, salt)
                };

                // create a new user
                connection.query("INSERT INTO users set ? ", data, function (error, rows) {
                    if (error) reject(error);
                    resolve("create a new user successfully");
                })
            }
            if (check === true)
                reject(`The username: ${user.username} has already exist. Please choose another username`)

        } catch (e) {
            reject(e);
        }
    });
};

let checkUserName = (username) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from users where username = ?", username, function (error, rows) {
                if (error) reject(error);
                if (rows.length > 0) resolve(true);
                resolve(false);
            })
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {createNewUser};