require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

connection.on('error', (err) => {
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
})

module.exports = connection;