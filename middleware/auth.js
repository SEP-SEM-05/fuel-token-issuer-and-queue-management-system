const jwt = require('jsonwebtoken');
require('dotenv').config();

let requireAuth = (req, res, next) => {

    let token;
    try {
        token = req.headers['token'].replace(/['"]+/g, '');
    }
    catch (err) {
        res.json({
            status: 'auth-error',
            error: "Your login session has expired, please re-login to proceed!"
        });
    }

    //check whether jwt exists and it is verified
    if(token){
        jwt.verify(token, process.env.JWT_ENV, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.json({
                    status: 'auth-error',
                    error: "Your login session has expired, please re-login to proceed!"
                });
            }
            else{
                // req.decodedID = decodedToken;
                next();
            }
        });
    }
    else{
        console.log('not token');
        res.json({
            status: 'auth-error',
            error: "Your login session has expired, please re-login to proceed!"
        });
    }

};

const maxAge = 1 * 24 * 60 * 60;
const createToken = () => {
    return jwt.sign({value: Date.now()}, process.env.JWT_ENV, {
        expiresIn: maxAge
    });
};

const createTokenWithUserID = (userID) => {
    return jwt.sign({userID}, process.env.JWT_ENV, {
        expiresIn: maxAge
    });
};

module.exports = {
    requireAuth,
    createToken,
    createTokenWithUserID,
};