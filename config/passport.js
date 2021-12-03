const LocalStrategy = require("passport-local").Strategy;
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbConfig = require('./database');
const connection = mysql.createConnection(dbConfig.connection);

// connection.connect((err) => {
//     if (!err)
//         console.log('DB connection succeeded.');
//     else
//         console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
// });

// connection.on('error', function(err) {
//     console.log("[mysql error]",err);
// });


module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], (err, rows) => {
            done(err, rows[0]);
        });
    });

    passport.use('local-signup',
        new LocalStrategy({usernameField: 'username', passwordField: 'password', passReqToCallback: true},
            (req, username, password, done) => {
                connection.query("SELECT * FROM users WHERE username = ? ", [username], (err, rows) => {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('registerMessage', 'Username is already taken'));
                    } else {
                        const newUserMysql = {username: username, password: bcrypt.hashSync(password, null, null)};
                        const insertQuery = "INSERT INTO users (username, password) values (?, ?)";

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
                            (err, rows) => {
                                newUserMysql.id = rows.insertId;
                                return done(null, newUserMysql);
                            });
                    }
                });
            }));

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, username, password, done) => {
                connection.query("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }

                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    return done(null, rows[0]);
                });
            }));
};
