let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const admin_username = process.env.ADMIN_USERNAME
const admin_psw = process.env.ADMIN_PASSWORD

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');



module.exports = {
    
}