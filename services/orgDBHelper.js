let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Org = require('../models/organization');

//save an organization to the database
//since the organizations are pre-populated, this should change the isRegistered to true
const saveClient = async (registrationNo, data) => {

    let result = await Org.updateOne({registrationNo}, data);
    return result;
}

//save refresh token by _id
const saveRefreshToken = async (token, id) => {

    let result = await Org.findByIdAndUpdate(id, {refreshToken: token});
    return result;
}

//find document by refresh token
const findByRefreshToken = async (token) => {

    let result = await Org.findOne({refreshToken: token});
    console.log(result)
    return result;
}

//find an registered organization given the registration No.
const findClientByRegNo = async (registrationNo) => {

    let client = await Org.findOne({registrationNo, isRegistered: true});
    return client;
}

//find an organization given the _id
const findClientByID = async (id) => {

    let client = await Org.findById(mongoose.Types.ObjectId(id));
    return client;
}

//update the station, given the registrationNo.
const updateStations = async (regNo, stations) => {
    let result = await Org.updateOne({registrationNo: regNo}, {stations: stations});
    return result;
}

module.exports = {
    saveClient,
    findByRefreshToken,
    saveRefreshToken,
    findClientByRegNo,
    findClientByID,
    updateStations,
}