let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const admin_username = process.env.ADMIN_USERNAME
const admin_psw = process.env.ADMIN_PASSWORD

// const Client = require('../models/client');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');

const login_post = async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    try {
        if(username === admin_username && password === admin_psw){

            let token = auth.createToken();

            res.json({
                status: 'ok',
                token: token
            });
        }
        else{
            res.json({
                status: 'error',
                error: 'Authentication error!'
            });
        }
    } 
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    login_post,
}