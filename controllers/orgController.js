let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const orgDBHelper = require('../services/orgDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');

//register an organization
const register_post = async (req, res) => {

    //registration process is different
    //register all the vehicles under the organization to the system

    let data = req.body;
    let password = data.password;
    let registrationNo = data.registrationNo;

    data.password = await encHandler.encryptCredential(password);
    let err = orgDBHelper.saveClient(data);

    if(err){
        let errField = (err.keyValue.email) ? 'email' : 'registrationNo';
        res.status(400).json({
            status: 'error',
            error: errField + ' already exists!',
        });
    }
    else{

        let user = await orgDBHelper.findClientByregistrationNo(registrationNo);
        let token = auth.createToken();
        let name = user.name;

        res.json({
            status: 'ok',
            token: token,
            userType: 'organization',
            data: {
                registrationNo: registrationNo,
                id: user._id,
                name: name
            }
        });
    }
}

//post organization login details
const login_post = async (req, res) => {

    const registrationNo = req.body.registrationNo;
    const password = req.body.password;

    try {

        const user = await orgDBHelper.findClientByRegNo(registrationNo);

        if(user !== null){
            
            let password_check = await encHandler.checkEncryptedCredential(password, user.password);

            if(password_check){

                let token = auth.createToken();
                let name = user.name;

                return_data = {
                    status: 'ok',
                    token: token,
                    userType: 'organization',
                    data: {
                        registrationNo: registrationNo,
                        id: user._id,
                        name: name
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
    register_post,
    login_post,
    get_dashboard,
}