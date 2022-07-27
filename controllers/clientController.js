let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Client = require('../models/client');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');



module.exports = {}