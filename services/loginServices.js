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
                try {
                    const url = `https://api.openweathermap.org/data/2.5/group?id=${process.env.COUNTRY_CODE_ONE || 1248991},${process.env.COUNTRY_CODE_TWO || 2158177}&units=metric&appid=${process.env.OPEN_WEATHER_API}`;
                    request(url, function (err, response, body) {
                        if (!err) {
                            const data = JSON.parse(body);
                            const date = new Date();
                            if (data) {
                                connection.query("INSERT INTO weather (country,date,place,user_id,temp) VALUES (?,?,?,?,?),(?,?,?,?,?)",
                                    [data.list[0].sys.country, date, data.list[0].name, user.id,
                                        data.list[0].main.temp, data.list[1].sys.country, date, data.list[1].name,
                                        user.id, data.list[1].main.temp],
                                    function (error, rows) {
                                        if (error) reject(error);
                                        let weather_data = rows[0];
                                        resolve(weather_data);
                                    });
                            }
                        }
                    });
                } catch
                    (e) {
                    reject(e);
                }
            }
        )
    }
;

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