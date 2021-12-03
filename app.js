const express = require('express');
const mainRoutes = require('./routes/mainRoutes');

// Initializing the express app
const app = express();

// registering the view engine (ejs)
app.set('view engine', 'ejs');

app.listen(3000);

// Routes
app.use('/', mainRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

