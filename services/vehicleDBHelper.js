let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Vehicle = require('../models/vehicle');

//find a vehicle given the registration No.
const findVehicleByRegNo = async (registrationNo) => {

    let vehicle = await Vehicle.findOne({registrationNo});
    return vehicle;
}

//find the registered vehicles of a given personal client given the nic
const findAllByNic = async (nic) => {
    let vehicles = await Vehicle.find({ownerNIC: nic, isRegistered: true});
    return vehicles;
}

//find vehicles of an organization using the registration No. array
const findAllByregistrationNoArray = async (regNoArray) => {
    let vehicles = await Vehicle.find({registrationNo: { $in: regNoArray }});
    return vehicles;
}

//update the station, given the registrationNo.
const updateStations = async (regNo, stations) => {
    let result = await Vehicle.updateOne({registrationNo: regNo}, {stations: stations});
    return result;
}

module.exports = {
    findVehicleByRegNo,
    findAllByNic,
    findAllByregistrationNoArray,
    updateStations,
}