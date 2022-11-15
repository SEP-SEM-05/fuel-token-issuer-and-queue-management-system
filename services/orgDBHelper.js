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

    let result = await Org.updateOne({_id: id}, { $set: {refreshToken: token} });
    return result;
}

//find an organization given the registration No.
const findOrgByRegNo = async (registrationNo) => {

    let client = await Org.findOne({registrationNo});
    return client;
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

//update the full fuel quotas, given the registrationNo.
const updateFullQuotas = async (regNo, fullQuotas) => {
    let result = await Org.updateOne({registrationNo: regNo}, {fullQuotas: fullQuotas});
    return result;
}

//find all org clients
const findAllClient = async () => {

    let clients = await Org.find();
    return clients;
}

//update the last filling details provided the registrationNo
const updateFillingDetails = async (regNo, lastFilledDate, remainingQuotas) => {
    let result = await Org.findOneAndUpdate({registrationNo: regNo}, {$set: {lastFilledDate, remainingQuotas}});
    return result
}

module.exports = {
    saveClient,
    saveRefreshToken,
    findOrgByRegNo,
    findClientByRegNo,
    findClientByID,
    updateStations,
    updateFullQuotas,
    findAllClient,
    updateFillingDetails,
}