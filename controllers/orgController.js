let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const orgDBHelper = require('../services/orgDBHelper');
const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get organization dashboard info
//fuel quota - remaining and full
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await orgDBHelper.findClientByID(id);

        if(user !== null){

            // return_user = {};

            //calculate the remaining quota and full quota
            //send stations of org
            //send all stations

            let vehicles = await vehicleDBHelper.findAllByregistrationNoArray(user.vehicles);
            let stations = await stationDBHelper.findAllRegisteredStations();
            let quotas = await vehicleDBHelper.getQuotas();

            let fullQuotaDiesel, fullQuotaPetrol;
            // let totalUsedQuotaDiesel, totalUsedQuotaPetrol;
            vehicles.forEach((vehicle) => {

                //select the corresponding quota from quotas
                //add amount to the fullQuota
                //calculate and add total used quota using vehicle.usedQuota

                for(const quota in quotas){

                    if(quota.vehicleType === vehicle.type && quota.fuelType === vehicle.fuelType){

                        if(quota.fuelType === 'Diesel'){
                            fullQuotaDiesel += quota.amount;
                        }
                        else{
                            fullQuotaPetrol += quota.amount;
                        }
                        break;
                    }
                }

                // if(vehicle.fuelType === 'Diesel'){
                //     totalUsedQuotaDiesel += vehicle.usedQuota;
                // }
                // else{
                //     totalUsedQuotaPetrol += vehicle.usedQuota;
                // }
            })

            // let remainingQuotaDiesel = fullQuotaDiesel - totalUsedQuotaDiesel;
            // let remainingQuotaPetrol = fullQuotaPetrol - totalUsedQuotaPetrol

            user['fullDieselQuota'] = fullQuotaDiesel;
            user['fullPetrolQuota'] = fullQuotaPetrol;

            // user['remainingDieselQuota'] = remainingQuotaDiesel;
            // user['remainingPetrolQuota'] = remainingQuotaPetrol;

            // return_user['fullDieselQuota'] = fullQuotaDiesel;
            // return_user['fullPetrolQuota'] = fullQuotaPetrol;

            // return_user['remainingDieselQuota'] = remainingQuotaDiesel;
            // return_user['remainingPetrolQuota'] = remainingQuotaPetrol;

            //stations array must contain strings with regNo and name concatde with '-'
            let org_stations = [];
            stations.forEach((station) => {

                if(user.stations.includes(station.registrationNo)){
                    org_stations.push(station.registrationNo + '-' + station.name);
                }
            })
            user['stations'] = org_stations;

            // return_user['stations'] = org_stations;
            // delete user.stations;

            // for(const key in user){
            //     return_user[key] = user[key];
            // }

            //create a string array containing all the stations
            //each string must contain regNo and name concated with '-'
            let return_stations = [];
            stations.forEach((station) => {
                return_stations.push(station.registrationNo + '-' + station.name);
            })

            res.json({
                status: 'ok',
                user: user,
                vehicles: vehicles,
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

//get organization vehicle details
const get_vehicles = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await orgDBHelper.findClientByID(id);

        if(user !== null){

            let vehicles = await vehicleDBHelper.findAllByregistrationNoArray(user.vehicles);
            let quotas = await vehicleDBHelper.getQuotas();

            vehicles.forEach((vehicle) => {

                for(const quota in quotas){

                    if(quota.vehicleType === vehicle.type && quota.fuelType === vehicle.fuelType){
                        
                        vehicle['weeklyQuota'] = quota.amount;
                        break;
                    }
                }
            })

            res.json({
                status: 'ok',
                user: user,
                vehicles: vehicles,
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

//change stations for an organization
const change_stations = async (req, res) => {

    let regNo = req.body.registrationNo;
    let stations = req.body.stations;

    try {
        //handle any possible errors
        let result = await orgDBHelper.updateStations(regNo, stations);
        //return necessary data
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

//request fuel for an organization
const request_fuel = async (req, res) => {
    //last filled date for a fuel type should be a week or more before
    let regNo = req.body.registrationNo;
    let fuelType = req.body.fuelType;
    let quota = req.body.fullQuota; // send either the fullDieselQuota or the fullPetrolQuota based on the fuelType
    let stations = req.body.stations;
    let userType = 'organization';

    try {

        //find any opened requests - if any, error
        let result = await vehicleDBHelper.findWaitingRequest(regNo, userType);

        if(!result) {

            let reqDetails = {
                userType: userType,
                registrationNo,
                quota: quota,
                fuelType,
                requestedStations: stations,
            };
    
            //save request, get _id and add to client details
            let reqId = await vehicleDBHelper.saveRequest(reqDetails);
    
            let clientDetails = {
                userType: userType,
                registrationNo: regNo,
                quota: quota,
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
    get_vehicles,
    change_stations,
    request_fuel,
}