let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');

//get station dashboard info
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await stationDBHelper.findStationByID(id);

        if(user !== null){

            res.json({
                status: 'ok',
                user: user,
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

module.exports = {
    get_dashboard,
}