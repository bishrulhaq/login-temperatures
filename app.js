/*
* Login Temperature Application
*
* */

const express = require('express');
const mainRoutes = require('./routes/mainRoutes');
const passport = require('passport');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// Initializing the express app
const app = express();

// registering the view engine (ejs)
app.set('view engine', 'ejs');

// static files will be accessed (css, js and other)
app.use(express.static('public'));

// passport auth config and database initialization
require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'c2dd1e4a46a3104aee859f1a02deb6cd7385f29ba86a18490373197784a87254',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', mainRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});

app.listen(3000);


