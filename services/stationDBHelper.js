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

//find any station given the registration No.
const findAnyStationByRegNo = async (registrationNo) => {

    let station = await Station.findOne({ registrationNo});
    
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

    let stations = await Station.find({isRegistered: false, isNew: false});
    return stations;
}

//get all newlyregistered stations
const findAllNewlyregisteredStations = async () => {

    let stations = await Station.find({isRegistered: false, isNew: true});
    return stations;
}

//get count of each type of registered stations
const countRegisteredStations = async (stationType) => {

    let stationCount = await Station.count({company: stationType, isRegistered: true});
    return stationCount;
}

//update the fuel amount, given the fuel type
const updateAmount = async (regNo, fuelType, addedAmount) => {
    let station = await findStationByRegNo(regNo);
    let vol = station.volumes.toJSON();
    vol[fuelType] += addedAmount;
    let result = await Station.findOneAndUpdate({ registrationNo: regNo }, { volumes: vol }, { new: true});
    return result.volumes.toJSON();
}

// update last announced time
const updateLastAnnounced = async (regNo, ftype ,time) => {
    let station = await findStationByRegNo(regNo);
    let la = station.lastAnnounced.toJSON();
    la[ftype] = new Date(time);

    let result = await Station.findOneAndUpdate(
      { registrationNo: regNo },
      { lastAnnounced: la },
      { new: true }
    );
    return result;
}

// register as newly registered station
const registerStation = async (regNo) => {

    let result = await Station.findOneAndUpdate(
      { registrationNo: regNo },
      { isNew: true }
    );
    return result;
}

// register all as newly registered station
const registerAllStation = async () => {

    let result = await Station.updateMany(
        { isRegistered: false , isNew: false },
        { isNew: true }
      );
    return result;
}

// update the station as ongoing station
const updateStationState = async (regNo) => {

    let result = await Station.findOneAndUpdate(
      { registrationNo: regNo },
      { isRegistered: true }
    );
    return result;
}

// save station temp password
const saveTempPass = async (regNo, password) => {

    let result = await Station.findOneAndUpdate(
      { registrationNo: regNo },
      { password: password }
    );
    return result;
}

// get start station
const getStartStation = async (regNo, password) => {

    let result = await Station.findOneAndUpdate(
      { registrationNo: regNo },
      { password: password, isRegistered: true }
    );
    return result;
}

module.exports = {
  saveRefreshToken,
  findStationByRegNo,
  findAnyStationByRegNo,
  findStationByID,
  findAllRegisteredStations,
  findAllUnregisteredStations,
  updateAmount,
  countRegisteredStations,
  updateLastAnnounced,
  registerStation,
  updateStationState,
  findAllNewlyregisteredStations,
  registerAllStation,
  saveTempPass,
  getStartStation
};