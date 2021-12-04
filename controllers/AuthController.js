const passport = require("passport");
const passportLocal = require("passport-local");
const loginService = require("../services/loginServices");

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use("localLogin", new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                await loginService.findUserByUserName(username).then(async (user) => {
                    if (!user) return done(null, false, {message: `This user : "${username}" doesn't exist`})
                    if (user) {
                        //compare password
                        const match = await loginService.compareUserPassword(user, password);
                        if (match === true) {
                            const weatherData = await loginService.addWeatherInfo(user);
                            return done(null, user, null);

                        }
                        return done(null, false, {message: match});
                    }
                });

            } catch (err) {
                return done(null, false, {message: err});
            }
        }));
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;
