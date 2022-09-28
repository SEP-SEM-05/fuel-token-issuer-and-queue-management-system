let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const orgDBHelper = require('../services/orgDBHelper');
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
        res.status(500).json({});
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
        res.status(500).json({});
    }
}

module.exports = {
    get_dashboard,
    change_stations,
}