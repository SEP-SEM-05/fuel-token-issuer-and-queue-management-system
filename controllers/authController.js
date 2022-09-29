let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const personalDBHelper = require('../services/personalDBHelper');
const orgDBHelper = require('../services/orgDBHelper');
const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');

//register a personal client
const register_post_personal = async (req, res) => {

    let data = req.body;
    let password = data.password;
    let nic = data.nic;

    try {

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
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//register an organization - incomplete
const register_post_org = async (req, res) => {

    //registration process is different
    //register all the vehicles under the organization to the system

    let data = req.body;
    let password = data.password;
    let registrationNo = data.registrationNo;

    try {

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
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//admin login
const login_post_admin = async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    const admin_username = process.env.ADMIN_USERNAME;
    const admin_psw = process.env.ADMIN_PASSWORD;

    try {
        if(username === admin_username && password === admin_psw){

            let token = auth.createToken();

            res.json({
                status: 'ok',
                token: token
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Authentication error!'
            });
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//post personal client login details
const login_post_personal = async (req, res) => {

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
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//post organization login details
const login_post_org = async (req, res) => {

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
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//post station login details
const login_post_station = async (req, res) => {
    
    const registrationNo = req.body.registrationNo;
    const password = req.body.password;

    try {

        const user = await stationDBHelper.findStationByRegNo(registrationNo);

        if(user !== null){
            
            let password_check = await encHandler.checkEncryptedCredential(password, user.password);

            if(password_check){

                let token = auth.createToken();
                let name = user.name;

                return_data = {
                    status: 'ok',
                    token: token,
                    userType: 'station',
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

module.exports = {
    register_post_personal,
    register_post_org,
    login_post_admin,
    login_post_personal,
    login_post_org,
    login_post_station,
}