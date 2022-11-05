let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Station = require('../models/station');

//save refresh token by _id
const saveRefreshToken = async (token, id) => {

    let result = await Station.updateOne({_id: id}, { $set: {refreshToken: token} });
    return result;
}

//find a station given the registration No.
const findStationByRegNo = async (registrationNo) => {

    let station = await Station.findOne({ registrationNo, isRegistered: true,});
    
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

//get all unregistered stations
const findAllUnregisteredStations = async () => {

    let stations = await Station.find({isRegistered: false});
    return stations;
}

//get count of each type of registered stations
const countRegisteredStations = async (stationType) => {

    let stationCount = await Station.count({company: stationType, isRegistered: true});
    return stationCount;
}

//update the fuel amount, given the fuel type
const updateAmount = async (regNo, fuelType, addedAmount) => {
    let station = findStationByID(regNo);
    station.volumes[fuelType] += addedAmount;
    let result = await Station.updateOne({ registrationNo: regNo }, { volumes: station.volumes });
    return result;
}

module.exports = {
  saveRefreshToken,
  findStationByRegNo,
  findStationByID,
  findAllRegisteredStations,
  findAllUnregisteredStations,
  updateAmount,
  countRegisteredStations,
};