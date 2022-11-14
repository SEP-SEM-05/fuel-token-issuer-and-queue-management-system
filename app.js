const express = require('express');
const cors = require('cors');

// environmental variables
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const personalRoutes = require('./routes/personalRoutes');
const orgRoutes = require('./routes/orgRoutes');
const stationRoutes = require('./routes/stationRoutes');
const mobileauthroutes = require('./routes/mobile/auth');

const makeApp = () => {
    // express app
    const app = express();

    app.use(
        cors({
            exposedHeaders: ["x-refresh-token", "x-access-token"],
        })
    );
    app.use(express.json());

    // middleware & static files
    app.use(express.urlencoded({ extended: true }));

    // set static file path for productioin build
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
    }

    app.use((req, res, next) => {
        res.locals.path = req.path;
        next();
    });

    //routes
    app.use('/auth', authRoutes);
    app.use('/admin', adminRoutes);
    app.use('/personal', personalRoutes);
    app.use('/org', orgRoutes);
    app.use('/station', stationRoutes);
    app.use("/mobileauth", mobileauthroutes);

    return app; 
} 

module.exports = {
    makeApp
}