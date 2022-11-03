const mongoose = require('mongoose');

function connect() {

    let dbURI;

    return new Promise((resolve, reject) => {

        if (process.env.NODE_ENV === 'test') {
            dbURI = process.env.DB_TEST_URI;
        } 
        else {
            // dbURI = process.env.DB_URI;
            dbURI = process.env.DB_TEST_URI;
        }

        mongoose.connect(dbURI,
            { useNewUrlParser: true, useUnifiedTopology: true })
            .then((res, err) => {
                if (err) return reject(err);
                resolve();
            })
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };