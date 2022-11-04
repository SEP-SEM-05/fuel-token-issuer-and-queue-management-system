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
}