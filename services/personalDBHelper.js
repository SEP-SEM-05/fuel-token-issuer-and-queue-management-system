let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const Personal = require('../models/personal');

//save a personal client to the database
const saveClient = (data) => {

    return new Promise(async (resolve, reject) => {

        let client = new Personal(data);

        client.save((err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(client._id);
            }
        });
    });
}

//save refresh token by _id
const saveRefreshToken = async (token, id) => {

    let result = await Personal.updateOne({_id: id}, { $set: {refreshToken: token} });
    return result;
}

//find a personal client given the nic
const findClientByNic = async (nic) => {

    let client = await Personal.findOne({nic});
    return client;
}

//find a personal client given the _id
const findClientByID = async (id) => {

    let client = await Personal.findById(mongoose.Types.ObjectId(id));
    return client;
}

module.exports = {
    saveClient,
    saveRefreshToken,
    findClientByNic,
    findClientByID,
}