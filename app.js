const express = require('express');

// Initializing the express app
const app = express();

// registering the view engine (ejs)
app.set('view engine', 'ejs');

app.listen(3000);

// Home Route and View
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

