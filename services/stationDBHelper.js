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

module.exports = {
    findStationByRegNo,
    findStationByID,
}