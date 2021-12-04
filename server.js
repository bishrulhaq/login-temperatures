/*
* Login Temperature Application
*
* */
require('dotenv').config();
const express = require("express");
const siteConfig = require("./config/siteConfig");
const initRoutes = require("./routes/mainRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

// Initializing the express server
const app = express();


app.use(cookieParser("secret"));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// config view engine and public
siteConfig(app);

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

//init all web routes
initRoutes(app);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at the ${port}`);
});



