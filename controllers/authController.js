let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const personalDBHelper = require("../services/personalDBHelper");
const orgDBHelper = require("../services/orgDBHelper");
const stationDBHelper = require("../services/stationDBHelper");
const vehicleDBHelper = require("../services/vehicleDBHelper");

const auth = require("../middleware/auth");
const encHandler = require("../middleware/encryptionHandler");

//register a personal client
const register_post_personal = async (req, res) => {

    let data = req.body;
    let password = data.password;
    let nic = data.nic;

    try {

        data['firstName'] = data.fname;
        delete data.fname;
        data['lastName'] = data.lname;
        delete data.lname;

        data.password = await encHandler.encryptCredential(password);
        delete data.confirmPassword;

        await personalDBHelper.saveClient(data);

        let user = await personalDBHelper.findClientByNic(nic);

        let token_data = {
            userType: 'personal',
            id: user._id,
            nic
        };

        let accessToken = auth.createAccessToken(token_data);
        let refreshToken = auth.createRefreshToken(token_data);

        await personalDBHelper.saveRefreshToken(refreshToken, user._id);

        res.header("x-access-token", accessToken);
        res.header("x-refresh-token", refreshToken);

        let fullName = user.firstName + " " + user.lastName;

        res.json({
            status: "ok",
            userType: "personal",
            data: {
                nic: nic,
                id: user._id,
                fullName: fullName,
            },
        });
    }
    catch (err) {

        console.log(err);

        let errField = err.keyValue.email ? "email" : "nic";
        res.status(400).json({
            status: "error",
            error: errField + " already exists!",
        });
    }
};

//register an organization and register all the vehicles belongs to it
const register_post_org = async (req, res) => {

    let data = req.body;
    let password = data.password;
    let registrationNo = data.regNo;

    try {

        let orgClient = await orgDBHelper.findOrgByRegNo(registrationNo);

        if (!orgClient) {

            res.status(400).json({
                status: "error",
                error: "Invalid Registration No.!",
            });
        }
        else if (orgClient.isRegistered) {

            res.status(400).json({
                status: "error",
                error: "Organization is already registered!",
            });
        }
        else {

            data['registrationNo'] = registrationNo;
            delete data.regNo;

            data.isRegistered = true;

            data.password = await encHandler.encryptCredential(password);
            delete data.confirmPassword

            await orgDBHelper.saveClient(registrationNo, data);
            await vehicleDBHelper.registerAll(orgClient.vehicles);

            let token_data = {
                userType: 'organization',
                id: user._id,
                registrationNo
            };

            let accessToken = auth.createAccessToken(token_data);
            let refreshToken = auth.createRefreshToken(token_data);

            await orgDBHelper.saveRefreshToken(refreshToken, user._id);

            res.header("x-access-token", accessToken);
            res.header("x-refresh-token", refreshToken);

            let name = data.name;

            res.json({
                status: "ok",
                userType: "organization",
                data: {
                    registrationNo: registrationNo,
                    id: orgClient._id,
                    name: name,
                    priority: user.priority,
                },
            });
        }
    }
    catch (err) {

        console.log(err);
        res.status(500).json({
            status: "error",
            error: "Internal server error!",
        });
    }
};

//post station get stand details
const getstand_post_station = async (req, res) => {

    const regNo = req.body.regNo;
    const tempPassword = req.body.tempPassword;
    let password = req.body.password;

    try {

        const station = await stationDBHelper.findAnyStationByRegNo(regNo);

        if (station !== null) {

            let password_check = await encHandler.checkEncryptedCredential(
                tempPassword,
                station.password
            );

            if (password_check) {

                password = await encHandler.encryptCredential(password);

                await stationDBHelper.getStartStation(regNo, password);

                let token_data = {
                    userType: 'station',
                    id: station._id,
                    regNo
                };

                let accessToken = auth.createAccessToken(token_data);
                let refreshToken = auth.createRefreshToken(token_data);

                await stationDBHelper.saveRefreshToken(refreshToken, station._id);

                res.header("x-access-token", accessToken);
                res.header("x-refresh-token", refreshToken);

                let name = station.name;

                return_data = {
                    status: "ok",
                    userType: "station",
                    data: {
                        registrationNo: regNo,
                        id: station._id,
                        name: name,
                    },
                };

                res.json(return_data);

            }else {

                res.status(400).json({
                    status: "error",
                    error: "Authentication error!",
                });
            }
        } 
        else {

            res.status(400).json({
                status: "error",
                error: "Invalid url link!",
            });
        }
    } 
    catch (err) {

        console.log(err);
        res.status(500).json({
            status: "error",
            error: "Internal server error!",
        });
    }
};

//admin login
const login_post_admin = async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    const admin_username = process.env.ADMIN_USERNAME;
    const admin_psw = process.env.ADMIN_PASSWORD;

    try {

        if (username === admin_username && password === admin_psw) {

            let token_data = { userType: 'admin', username };

            let accessToken = auth.createAccessToken(token_data);
            let refreshToken = auth.createRefreshToken(token_data);

            res.header("x-access-token", accessToken);
            res.header("x-refresh-token", refreshToken);

            res.json({
                status: "ok",
                userType: "admin",
            });
        }
        else {

            res.status(400).json({
                status: "error",
                error: "Authentication error!",
            });
        }
    }
    catch (err) {

        console.error(err);
        res.status(500).json({
            status: "error",
            error: "Internal server error!",
        });
    }
};

//post personal client login details
const login_post_personal = async (req, res) => {

    const nic = req.body.nic;
    const password = req.body.password;

    try {

        const user = await personalDBHelper.findClientByNic(nic);

        if (user !== null) {

            let password_check = await encHandler.checkEncryptedCredential(
                password,
                user.password
            );

            if (password_check) {

                // //check is verified
                // if (!user.isVerified) {
                //     res.status(400).json({
                //         status: "error",
                //         error: "Unverified User!",
                //     });
                // }
                // else{
                //     // the rest
                // }

                let token_data = {
                    userType: 'personal',
                    id: user._id,
                    nic
                };

                let accessToken = auth.createAccessToken(token_data);
                let refreshToken = auth.createRefreshToken(token_data);

                await personalDBHelper.saveRefreshToken(refreshToken, user._id);

                res.header("x-access-token", accessToken);
                res.header("x-refresh-token", refreshToken);

                let fullName = user.firstName + " " + user.lastName;

                return_data = {
                    status: "ok",
                    userType: "personal",
                    data: {
                        nic: nic,
                        id: user._id,
                        fullName: fullName,
                    },
                };

                res.json(return_data);
            }
            else {

                res.status(400).json({
                    status: "error",
                    error: "Authentication error!",
                });
            }
        }
        else {

            res.status(400).json({
                status: "error",
                error: "Authentication error!",
            });
        }
    }
    catch (err) {

        console.log(err);
        res.status(500).json({
            status: "error",
            error: "Internal server error!",
        });
    }
};

//post organization login details
const login_post_org = async (req, res) => {

    const registrationNo = req.body.registrationNo;
    const password = req.body.password;

    try {

        const user = await orgDBHelper.findClientByRegNo(registrationNo);

        if (user !== null) {

            let password_check = await encHandler.checkEncryptedCredential(
                password,
                user.password
            );

            if (password_check) {

                // //check is verified
                // if (!user.isVerified) {
                //     res.status(400).json({
                //         status: "error",
                //         error: "Unverified User!",
                //     });
                // }
                // else{
                //     // the rest
                // }

                let token_data = {
                    userType: 'organization',
                    id: user._id,
                    registrationNo
                };

                let accessToken = auth.createAccessToken(token_data);
                let refreshToken = auth.createRefreshToken(token_data);

                await orgDBHelper.saveRefreshToken(refreshToken, user._id);

                res.header("x-access-token", accessToken);
                res.header("x-refresh-token", refreshToken);

                let name = user.name;

                return_data = {
                    status: "ok",
                    userType: "organization",
                    data: {
                        registrationNo: registrationNo,
                        id: user._id,
                        name: name,
                        priority: user.priority,
                    },
                };
                res.json(return_data);
            }
            else {
                res.status(400).json({
                    status: "error",
                    error: "Authentication error!",
                });
            }
        }
        else {
            res.status(400).json({
                status: "error",
                error: "Authentication error!",
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            error: "Internal server error!",
        });
    }
};

//post station login details
const login_post_station = async (req, res) => {

    const registrationNo = req.body.registrationNo;
    const password = req.body.password;

    try {

        const user = await stationDBHelper.findStationByRegNo(registrationNo);

        if (user !== null) {

            let password_check = await encHandler.checkEncryptedCredential(
                password,
                user.password
            );

            if (password_check) {

                let token_data = {
                    userType: 'station',
                    id: user._id,
                    registrationNo
                };

                let accessToken = auth.createAccessToken(token_data);
                let refreshToken = auth.createRefreshToken(token_data);

                await stationDBHelper.saveRefreshToken(refreshToken, user._id);

                res.header("x-access-token", accessToken);
                res.header("x-refresh-token", refreshToken);

                let name = user.name;

                return_data = {
                    status: "ok",
                    userType: "station",
                    data: {
                        registrationNo: registrationNo,
                        id: user._id,
                        name: name,
                    },
                };

                res.json(return_data);
            }
            else {

                res.status(400).json({
                    status: "error",
                    error: "Authentication error!",
                });
            }
        }
        else {

            res.status(400).json({
                status: "error",
                error: "Authentication error!",
            });
        }
    }
    catch (err) {

        console.log(err);
        res.status(500).json({
            status: "error",
            error: "Internal server error!",
        });
    }
};

module.exports = {
    register_post_personal,
    register_post_org,
    getstand_post_station,
    login_post_admin,
    login_post_personal,
    login_post_org,
    login_post_station,
};
