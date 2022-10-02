let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const personalDBHelper = require('../services/personalDBHelper');
const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get personal client dashboard info
//vehicles string array - for each vehicle calculate the full quota and the remaining quota
//stations string array
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await personalDBHelper.findClientByID(id);

        if(user !== null){

            let vehicles = await vehicleDBHelper.findAllByNic(user.nic);
            let stations = await stationDBHelper.findAllRegisteredStations();
            let quotas = await vehicleDBHelper.getQuotas();

            let return_vehicles = [];
            vehicles.forEach((vehicle) => {

                // let return_vehicle = {};

                //select the corresponding quota from quotas
                //add amount as fullQuota
                //calculate and add remaining quota using vehicle.usedQuota

                let fullQuota;
                for(const quota in quotas){

                    if(quota.vehicleType === vehicle.type && quota.fuelType === vehicle.fuelType){

                        fullQuota = quota.amount;
                        break;
                    }
                }
                vehicle['fullQuota'] = fullQuota;
                vehicle['remainingQuota'] = fullQuota - vehicle.usedQuota;

                // return_vehicle['fullQuota'] = fullQuota;
                // return_vehicle['remainingQuota'] = fullQuota - vehicle.usedQuota;

                //stations array must contain strings with regNo and name concatde with '-'
                let vehicle_stations = [];
                stations.forEach((station) => {

                    if(vehicle.stations.includes(station.registrationNo)){
                        vehicle_stations.push(station.registrationNo + '-' + station.name);
                    }
                })
                vehicle['stations'] = vehicle_stations;

                // return_vehicle['stations'] = vehicle_stations;
                // delete vehicle.stations;

                // for(const key in vehicle){
                //     return_vehicle[key] = vehicle[key];
                // }

                return_vehicles.push(vehicle);
                // return_vehicles.push(return_vehicle);
            })

            //create a string array containing all the stations
            //each string must contain regNo and name concated with '-'
            let return_stations = [];
            stations.forEach((station) => {
                return_stations.push(station.registrationNo + '-' + station.name);
            })

            res.json({
                status: 'ok',
                user: user,
                vehicles: return_vehicles,
                stations: return_stations
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//register a vehicle to the system
const add_vehicle = async (req, res) => {

    let nic = req.body.nic
    let regNo = req.body.registrationNo;
    let engineNo = req.body.engineNo;
    let stations = req.body.stations;

    try {

        let vehicle = await vehicleDBHelper.findVehicleByRegNoAndEngNo(regNo, engineNo);

        if(!vehicle){
            res.status(400).json({
                status: 'error',
                error: 'Invalid registration No. or engine No.!'
            });
        }
        else if(nic !== vehicle.ownerNIC){
            res.status(400).json({
                status: 'error',
                error: 'Invalid Owner!'
            });
        }
        else if(vehicle.isRegistered){
            res.status(400).json({
                status: 'error',
                error: 'Vehicle has already registered!'
            });
        }
        else{

            let result = await vehicleDBHelper.updateStationsAndRegister(regNo, stations);
            res.json({
                status: 'ok',
            });
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//add change stations of a registered vehicle
const change_stations = async (req, res) => {

    let regNo = req.body.registrationNo;
    let stations = req.body.stations;

    try {

        let result = await vehicleDBHelper.updateStationsAndRegister(regNo, stations);

        res.json({
            status: 'ok',
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//request fuel for a vehicle
const request_fuel = async (req, res) => {

    let regNo = req.body.registrationNo;
    let fuelType = req.body.fuelType;
    let remainingQuota = req.body.remainingQuota;
    let stations = req.body.stations;

    try {

        //find any opened requests - if any, error
        let result = await vehicleDBHelper.findWaitingRequest(regNo, 'personal');

        if(!result) {

            let reqDetails = {
                userType: 'personal',
                registrationNo,
                remainingQuota,
                fuelType,
                requestedStations: stations,
            };
    
            //save request, get _id and add to client details
            let reqId = await vehicleDBHelper.saveRequest(reqDetails);
    
            let clientDetails = {
                userType: 'personal',
                registrationNo: regNo,
                remainingQuota: remainingQuota,
                requestID: reqId
            }
    
            await vehicleDBHelper.addToQueue(stations, fuelType, clientDetails);
            delete clientDetails.requestID;
    
            res.json({
                status: 'ok',
                data: clientDetails
            });
        } 
        else{
            res.status(400).json({
                status: 'error',
                error: 'Multiple requests are not allowed!'
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

module.exports = {
    get_dashboard,
    add_vehicle,
    change_stations,
    request_fuel,
}