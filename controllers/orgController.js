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

module.exports = {
    get_dashboard,
}