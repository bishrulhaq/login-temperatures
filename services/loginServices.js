const connection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const request = require("request");


const findUserByUserName = (username) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from users where username = ?", username, function (error, rows) {
                if (error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        } catch (e) {
            reject(e);
        }
    })
};

const addWeatherInfo = (user) => {
    return new Promise((resolve, reject) => {
        const country = "sri_lanka";
        const temp = "sri_lanka";
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=colombo&appid=${process.env.OPEN_WEATHER_API}`;
            request(url, function (err, response, body) {
                if (!err) {
                    console.log(body);
                    connection.query("INSERT INTO weather (country,user_id,temp) VALUES (?,?,?)", [country, user.id, temp], function (error, rows) {
                        if (error) reject(error);
                        let weather_data = rows[0];
                        resolve(weather_data);
                    });
                }
            });
        } catch (e) {
            reject(e);
        }
    })
};

const compareUserPassword = (user, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let match = await bcrypt.compare(password, user.password);
            if (match) resolve(true);
            else resolve("The password that you've entered is incorrect")
        } catch (e) {
            reject(e);
        }
    })
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from users where id = ?", id, function (error, rows) {
                if (error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        } catch (e) {
            reject(e);
        }
    })
};

module.exports = {compareUserPassword, findUserByUserName, findUserById, addWeatherInfo};