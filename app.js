const express = require('express');
const cors = require('cors');

// environmental variables
require('dotenv').config();

const personalRoutes = require('./routes/personalRoutes');
const orgRoutes = require('./routes/orgRoutes');

const makeApp = () => {
    // express app
    const app = express();

    app.use(cors());
    app.use(express.json());

    // middleware & static files
    app.use(express.urlencoded({ extended: true }));

    // set static file path for productioin build
    if (process.env.NODE_ENV === 'production'){
        app.use(express.static('client/build'));
    }

    app.use((req, res, next) => {
        res.locals.path = req.path;
        next();
    });

    //routes
    app.use('/personal', personalRoutes);
    app.use('/org', orgRoutes);

    return app;
}

module.exports = {
    makeApp
}