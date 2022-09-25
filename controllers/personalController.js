let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const personalDBHelper = require('../services/personalDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get personal client dashboard info
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await personalDBHelper.findClientByID(id);

        if(user !== null){

            let vehicles = await vehicleDBHelper.findAllByNic(user.nic);

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