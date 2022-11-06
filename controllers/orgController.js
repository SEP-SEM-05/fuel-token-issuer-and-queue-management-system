let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const orgDBHelper = require('../services/orgDBHelper');
const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get organization dashboard info
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await orgDBHelper.findClientByID(id);

        if(user !== null){

            let vehicles = await vehicleDBHelper.findAllByregistrationNoArray(user.vehicles);
            let stations = await stationDBHelper.findAllRegisteredStations();
            let quotas = await vehicleDBHelper.getQuotas();

            let fullQuotas = {};
            let fullQuotaDiesel = 0;
            let fullQuotaPetrol = 0;
            vehicles.forEach((vehicle) => {

                //select the corresponding quota from quotas
                //add amount to the fullQuota
                //calculate and add total used quota using vehicle.usedQuota

                for(const i in quotas){
                    
                    if(quotas[i].vehicleType === vehicle.type && quotas[i].fuelType === vehicle.fuelType){

                        if(quotas[i].fuelType === 'Diesel'){
                            fullQuotaDiesel += quotas[i].amount;
                        }
                        else{
                            fullQuotaPetrol += quotas[i].amount;
                        }
                        break;
                    }
                }
            });

            fullQuotas['fullDieselQuota'] = fullQuotaDiesel;
            fullQuotas['fullPetrolQuota'] = fullQuotaPetrol;

            //if the quotas have changed update them in the org collection
            if(user.fullQuotas[0] !== fullQuotaDiesel || user.fullQuotas[1] !== fullQuotaPetrol){

                try {

                    let update_result = await orgDBHelper.updateFullQuotas(user.registrationNo, [fullQuotaDiesel, fullQuotaPetrol]);
                    console.log("Full quotas updated");
                } 
                catch (err) {
                    console.log(err);
                    res.status(500).json({
                        status: 'error',
                        error: 'Internal server error!'
                    });
                }
            }

            //stations array must contain strings with regNo and name concatde with '-'
            let org_stations = [];
            stations.forEach((station) => {

                if(user.stations.includes(station.registrationNo)){
                    org_stations.push(station.registrationNo + '-' + station.name);
                }
            });

            //create a string array containing all the stations
            //each string must contain regNo and name concated with '-'
            let return_stations = [];
            stations.forEach((station) => {
                return_stations.push(station.registrationNo + '-' + station.name);
            })

            let lastFilledDateObj = user.lastFilledDate.toJSON();

            let petrol_lfd = new Date(lastFilledDateObj.Petrol);
            let diesel_lfd = new Date(lastFilledDateObj.Diesel);

            let lastFilledDate = (petrol_lfd > diesel_lfd ? petrol_lfd : diesel_lfd);
            let return_lfd = String(lastFilledDate.getFullYear()) + " - " + String(lastFilledDate.getMonth() + 1).padStart(2, '0') + " - " + String(lastFilledDate.getDate()).padStart(2, '0');

            res.json({
                status: 'ok',
                org_regNo: user.registrationNo,
                orgStations: org_stations,
                vehicleCount: vehicles.length,
                fullQuotas: fullQuotas,
                lastFilledDate: return_lfd,
                remainingQuotas: user.remainingQuotas,
                stations: return_stations,
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

            let return_vehicles = []

            vehicles.forEach((vehicle) => {

                let return_vehicle = {};

                for(const i in quotas){

                    if(quotas[i].vehicleType === vehicle.type && quotas[i].fuelType === vehicle.fuelType){
                        
                        return_vehicle['weeklyQuota'] = quotas[i].amount;
                        break;
                    }
                }

                return_vehicle['registrationNo'] = vehicle.registrationNo;
                return_vehicle['type'] = vehicle.type;
                return_vehicle['fuelType'] = vehicle.fuelType;

                let lastFilledDateObj = user.lastFilledDate.toJSON();
                let lastFilledDate = vehicle.type === "Petrol" ? new Date(lastFilledDateObj.Petrol) : new Date(lastFilledDateObj.Diesel);
                let return_lfd = String(lastFilledDate.getFullYear()) + " - " + String(lastFilledDate.getMonth() + 1).padStart(2, '0') + " - " + String(lastFilledDate.getDate()).padStart(2, '0');
                
                return_vehicle['lastFilledDate'] = return_lfd;

                return_vehicles.push(return_vehicle);
            })

            res.json({
                status: 'ok',
                vehicles: return_vehicles,
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
    let req_stations = req.body.stations;

    try{

        let user = await orgDBHelper.findClientByRegNo(regNo);

        if(user !== null){

            let stations = [];

            for(let i = 0; i < req_stations.length; i++){
                let station_regNo = req_stations[i].split('-')[0].trim();
                stations.push(station_regNo);
            }

            let result = await orgDBHelper.updateStations(regNo, stations);
            
            res.json({
                status: 'ok'
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

    // try {
    //     //handle any possible errors
    //     let result = await orgDBHelper.updateStations(regNo, stations);
    //     //return necessary data
    //     res.json({
    //         status: 'ok',
    //     });
    // } 
    // catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         status: 'error',
    //         error: 'Internal server error!'
    //     });
    // }
}

//request fuel for an organization
const request_fuel = async (req, res) => {
    //last filled date for a fuel type should be a week or more before
    let regNo = req.body.registrationNo;
    let fuelType = req.body.fuelType;
    let quota = req.body.fullQuota; // send either the fullDieselQuota or the fullPetrolQuota based on the fuelType
    let stations = req.body.stations;
    let priority = req.body.priority;
    let userType = 'organization';

    try {

        //find any opened requests - if any, error
        let result = await vehicleDBHelper.findWaitingRequest(regNo, userType);

        if(!result) {

            let reqDetails = {
                userId: registrationNo,
                userType: userType,
                registrationNo,
                quota: quota,
                fuelType,
                requestedStations: stations,
                priority
            };
    
            //save request, get _id and add to client details
            let reqId = await vehicleDBHelper.saveRequest(reqDetails);
    
            let clientDetails = {
                userType: userType,
                registrationNo: regNo,
                quota: quota,
            }
    
            await vehicleDBHelper.addToQueue(stations, fuelType, reqId);
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