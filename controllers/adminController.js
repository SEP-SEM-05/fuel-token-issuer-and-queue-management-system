let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const quotaDBHelper = require('../services/quotaDBHelper');
const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const admin_username = process.env.ADMIN_USERNAME
const admin_psw = process.env.ADMIN_PASSWORD

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get admin dashboard info (Quota info)
const get_dashboard = async (req, res) => {

    let fuelType = req.params.fueltype;

    try{

        let quota = await quotaDBHelper.findQuotaByFuelType(fuelType);
        console.log(quota)
        if(quota !== null){
            res.json({
                status: 'ok',
                quota: quota,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Quota!'
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

//Update the fuel quota
const update_fuel_quota = async (req, res) => {
    let vehicleType = req.body.vehicleType;
    let fuelType = req.body.fuelType;
    let newAmount = parseFloat(req.body.newAmount); 
  
    try {
      //handle any possible errors
      let result = await quotaDBHelper.updateQuota(
        vehicleType,
        fuelType,
        newAmount
      );
      //return necessary data
      res.json({
        status: "ok",
        newAmount: result,
      });
    } catch(err){
          console.log(err);
          res.status(500).json({
              status: 'error',
              error: 'Internal server error!'
          });
      }
  };

//get all registered stations info 
const get_registered_station = async (req, res) => {


    try{

        let station = await stationDBHelper.findAllRegisteredStations();
        console.log(station)
        if(station !== null){
            res.json({
                status: 'ok',
                station: station,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Station!'
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

// register as newly registered station
const register_station = async (req, res) => {
let regNo = req.body.registrationNo;

try {
    //handle any possible errors
    let result = await stationDBHelper.registerStation(regNo);

    //return necessary data
    res.json({
    status: "ok",
    registeredStation: result,
    });
} catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
};

// register all as newly registered stations
const register_all_station = async (req, res) => {
    
    try {
        //handle any possible errors
        let result = await stationDBHelper.registerAllStation();
    
        //return necessary data
        res.json({
        status: "ok",
        registeredStations: result,
        });
    } catch(err){
            console.log(err);
            res.status(500).json({
                status: 'error',
                error: 'Internal server error!'
            });
        }
    };
  
// update the station as ongoing station
const update_station_state = async (req, res) => {
let regNo = req.body.registrationNo;

try {
    //handle any possible errors
    let result = await stationDBHelper.updateStationState(regNo);

    //return necessary data
    res.json({
    status: "ok",
    registeredStation: result,
    });
} catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
};

//get count of registered stations
const get_count_registered_station = async (req, res) => {

    let stationType = req.params.stationType;

    try{

        let stationCount = await stationDBHelper.countRegisteredStations(stationType);
        console.log(stationCount)
        if(stationCount !== null){
            res.json({
                status: 'ok',
                stationCount: stationCount,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Output!'
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

//get all unregistered stations info 
const get_unregistered_station = async (req, res) => {

    try{

        let station = await stationDBHelper.findAllUnregisteredStations();
        console.log(station)
        if(station !== null){
            res.json({
                status: 'ok',
                station: station,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Station!'
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

//get all newly registered stations info 
const get_newlyregistered_station = async (req, res) => {

    try{

        let station = await stationDBHelper.findAllNewlyregisteredStations();
        console.log(station)
        if(station !== null){
            res.json({
                status: 'ok',
                station: station,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Station!'
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

//get all vehicles info 
const get_vehicle = async (req, res) => {


    try{

        let vehicles = await vehicleDBHelper.findAllVehicles();
        console.log(vehicle)
        if(vehicles !== null){
            res.json({
                status: 'ok',
                vehicle: vehicle,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid Vehicle!'
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


module.exports = {
    get_dashboard,
    get_registered_station,
    get_unregistered_station,
    get_vehicle,
    get_count_registered_station,
    update_fuel_quota,
    register_station,
    update_station_state,
    get_newlyregistered_station,
    register_all_station
}