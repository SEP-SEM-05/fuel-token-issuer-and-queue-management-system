let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Personal = require('../models/personal');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');



module.exports = {}