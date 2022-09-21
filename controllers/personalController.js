let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const personalDBHelper = require('../services/personalDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');

//register a personal client
const register_post = async (req, res) => {

    let data = req.body;
    let password = data.password;
    let nic = data.nic;

    data.password = await encHandler.encryptCredential(password);
    let err = personalDBHelper.saveClient(data);

    if(err){
        let errField = (err.keyValue.email) ? 'email' : 'nic';
        res.status(400).json({
            status: 'error',
            error: errField + ' already exists!',
        });
    }
    else{

        let user = await personalDBHelper.findClientByNic(nic);
        let token = auth.createToken();
        let fullName = user.firstName + " " + user.lastName;

        res.json({
            status: 'ok',
            token: token,
            userType: 'personal',
            data: {
                nic: nic,
                id: user._id,
                fullName: fullName
            }
        });
    }
}

//post personal client login details
const login_post = async (req, res) => {

    const nic = req.body.nic;
    const password = req.body.password;

    try {

        const user = await personalDBHelper.findClientByNic(nic);

        if(user !== null){
            
            let password_check = await encHandler.checkEncryptedCredential(password, user.password);

            if(password_check){

                let token = auth.createToken();
                let fullName = user.firstName + " " + user.lastName;

                return_data = {
                    status: 'ok',
                    token: token,
                    userType: 'personal',
                    data: {
                        nic: nic,
                        id: user._id,
                        fullName: fullName
                    }
                }
                res.json(return_data);
            }
            else{
                res.status(400).json({
                    status: 'error',
                    error: 'Authentication error!'
                });
            }
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Authentication error!'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({});
    }
}

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
    register_post,
    login_post,
    get_dashboard,
}