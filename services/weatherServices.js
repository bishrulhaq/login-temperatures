const connection = require("../config/dbConnection");

let getWeatherByUserId = (user_id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from weather where user_id = ?", user_id, function (error, rows) {
                if (error) reject(error);
                if (rows.length > 0) resolve(rows);
                resolve(false);
            })
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {getWeatherByUserId};

