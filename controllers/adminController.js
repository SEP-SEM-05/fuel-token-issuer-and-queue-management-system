let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const quotaDBHelper = require('../services/quotaDBHelper');

const admin_username = process.env.ADMIN_USERNAME
const admin_psw = process.env.ADMIN_PASSWORD

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get admin dashboard info (Quota info)
const get_dashboard = async (req, res) => {

    //let fuelType = req.params.fuelType;

    try{

        let quota = await quotaDBHelper.findQuotaByFuelType("Petrol");

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


module.exports = {
    get_dashboard,
}