const mongoose = require('mongoose');

// environmental variables
require('dotenv').config();
const dbURI = process.env.DB_URI;

function connect() {
    return new Promise((resolve, reject) => {

    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage()
    .then(() => {
        mongoose.connect(dbURI,
        { useNewUrlParser: true, useCreateIndex: true })
        .then((res, err) => {
            if (err) return reject(err);
            resolve();
        })
    });
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };