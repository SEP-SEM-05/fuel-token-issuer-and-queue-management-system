const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

//express app
const appMaker = require('./app');
const app = appMaker.makeApp();

// db connection methods
const db = require('./db_connection');

const port = process.env.PORT || 5000;

// connect to mongodb and listen

db.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Running on port ${port}`);
        });
    });