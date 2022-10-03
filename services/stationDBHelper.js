let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Station = require('../models/station');

//find a station given the registration No.
const findStationByRegNo = async (registrationNo) => {

    let station = await Station.findOne({registrationNo, isRegistered: true});
    return station;
}

//find a stationgiven the _id
const findStationByID = async (id) => {

    let station = await Station.findById(mongoose.Types.ObjectId(id));
    return station;
}

//get all registered stations
const findAllRegisteredStations = async () => {

    let stations = await Station.find({isRegistered: true});
    return stations;
}

//update the fuel amount, given the fuel type
const updateAmount = async (regNo, fuelType, addedAmount) => {
    let station = findStationByID(regNo);
    station.volumes[fuelType] += addedAmount;
    let result = await Station.updateOne({ registrationNo: regNo }, { volumes: station.volumes });
    return result;
}

module.exports = {
    findStationByRegNo,
    findStationByID,
    findAllRegisteredStations,
    updateAmount,
}