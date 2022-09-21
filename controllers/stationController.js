let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Station = require('../models/station');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');



module.exports = {}