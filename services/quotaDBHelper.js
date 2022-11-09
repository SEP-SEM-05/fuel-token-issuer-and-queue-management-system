let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Quota = require('../models/quota');

//find the fuel quota for selected fuel type
const findQuotaByFuelType = async (fuelType) => {

    let quota = await Quota.find({fuelType});
    return quota;
}

//update the fuel quota for a vehicle type, given the fuel type
const updateQuota = async (vehicleType, fuelType, newAmount) => {

    let result = await Quota.findOneAndUpdate({ vehicleType: vehicleType, fuelType: fuelType }, { amount: newAmount});
    return result.amount;
}

module.exports = {
    findQuotaByFuelType,
    updateQuota,
}