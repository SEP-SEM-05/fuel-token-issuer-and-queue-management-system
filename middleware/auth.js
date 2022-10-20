const jwt = require('jsonwebtoken');
require('dotenv').config();

const personalDBHelper = require("../services/personalDBHelper");
const orgDBHelper = require("../services/orgDBHelper");
const stationDBHelper = require("../services/stationDBHelper");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
const ACCESS_EXP = process.env.ACCESS_EXP;
const REFRESH_EXP = process.env.REFRESH_EXP;

let requireAuth = async (req, res, next) => {

    try {

        let refreshTokenHeader = req.headers["x-refresh-token"];
        let accessTokenHeader = req.headers["x-access-token"];

        if (refreshTokenHeader === undefined && accessTokenHeader === undefined) {

            return res.status(404).json({
                status: 'auth-error',
                error: 'auth token not found'
            });
        }
        else {

            let refreshToken = refreshTokenHeader && refreshTokenHeader.split(" ")[1]; //TODO:check whether bearer is there to split
            let accessToken = accessTokenHeader && accessTokenHeader.split(" ")[1];

            if (accessToken) {

                const accessTokenCheck = accessTokenVerify(accessToken);

                if (accessTokenCheck.status === "ok") {

                    res.header("x-access-token", accessTokenCheck.newAccessToken);
                    req.userData = accessTokenCheck.data;

                    return next();
                }
                else {

                    const refreshTokenCheck = await refreshTokenVerify(refreshToken);

                    if (refreshTokenCheck.status === "ok") {

                        res.header("x-access-token", refreshTokenCheck.newAccessToken);
                        req.userData = refreshTokenCheck.data;

                        return next();
                    }
                    else {
                        return res.status(401).json(refreshTokenCheck);
                    }
                }
            }
            else {
                console.log("access token undefined - auth 60")
                const refreshTokenCheck = await refreshTokenVerify(refreshToken);

                if (refreshTokenCheck.status === "ok") {

                    res.header("x-access-token", refreshTokenCheck.newAccessToken);
                    req.userData = refreshTokenCheck.data;

                    return next();
                }
                else {
                    return res.status(401).json(refreshTokenCheck);
                }
            }
        }
    } 
    catch (err) {
        res.status(500).send({
            status: 'error',
            error: 'Internal server error!'
        });
    }
};

const accessTokenVerify = (token) => {

    try {

        const value = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

        delete value.iat;
        delete value.exp;

        const newAccessToken = jwt.sign(value, ACCESS_TOKEN_SECRET_KEY, { expiresIn: ACCESS_EXP });

        return { status: "ok", data: value, newAccessToken: newAccessToken };
    }
    catch (error) {
        return { status: "auth-error", error: "token expired!" };
    }
};


const refreshTokenVerify = async (token) => {

    try {

        const value = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);

        delete value.iat;
        delete value.exp;

        let user;
        if (value.userType === 'admin' && value.username === process.env.ADMIN_USERNAME) {

            const newAccessToken = jwt.sign(value, ACCESS_TOKEN_SECRET_KEY, { expiresIn: ACCESS_EXP });
            return { status: "ok", data: value, newAccessToken: newAccessToken };
        }
        else if (value.userType === 'personal') {
            user = await personalDBHelper.findClientByID(value.id);
        }
        else if (value.userType === 'organization') {
            user = await orgDBHelper.findClientByID(value.id)
        }
        else if (value.userType === 'station') {
            user = await stationDBHelper.findStationByID(value.id);
        }

        if (user) {

            if (value.id === user.id) {

                const newAccessToken = jwt.sign(value, ACCESS_TOKEN_SECRET_KEY, { expiresIn: ACCESS_EXP });

                return { status: "ok", data: value, newAccessToken: newAccessToken };
            }
            else {

                return { status: "auth-error", error: "Invalid token!" };
            }
        }
        else {

            return { status: "auth-error", error: "Invalid token!" };
        }
    }
    catch (error) {
        return { status: "auth-error", error: "Invalid/expired token!" };
    }
};

const createAccessToken = (data) => {
    return jwt.sign(data, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: ACCESS_EXP
    });
};

const createRefreshToken = (data) => {
    return jwt.sign(data, REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: REFRESH_EXP
    });
};

module.exports = {
    requireAuth,
    accessTokenVerify,
    refreshTokenVerify,
    createAccessToken,
    createRefreshToken,
};