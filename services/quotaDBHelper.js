let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Quota = require('../models/quota');

//find the fuel quota for selected fuel type
const findQuotaByFuelType = async (fuelType) => {

    let quota = await Quota.find({fuelType});
    return quota;
}


module.exports = {
    findQuotaByFuelType,
}