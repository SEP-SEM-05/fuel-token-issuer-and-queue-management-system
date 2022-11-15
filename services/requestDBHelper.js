let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const Request = require("../models/request");

// get request object array
const getAllReqByIds = async (id_arr) => {
    let requests = await Request.find({ _id: { $in: id_arr } });
    return requests;
}

// get station array of a request id
const getStationsOfReq = async (reqId) => {
  let req = await Request.findOne({_id: reqId});
  return req.requestedStations;
}

//save a fuel request to the database
const saveRequest = (data) => {

    return new Promise(async (resolve, reject) => {

        let request = new Request(data);

        request.save((err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(request._id);
            }
        });
    });
}

//find any waiting/active requests for a vehicle/organization given the registration No.
const findWaitingAndActiveRequest = async (registrationNo, userType) => {

    result = await Request.findOne({registrationNo, userType, state: {$in: ['waiting', 'active']}});
    return result;
}

//close the request after filling is done
const closeRequest = async (reqId, filledStation, isFilled, filledDate, filledAmount, state) => {
    let result = Request.findOneAndUpdate({ "_id": reqId }, { "$set": { filledStation, isFilled, filledDate, filledAmount, state }});
    return result;
}

module.exports = {
  getAllReqByIds,
  getStationsOfReq,
  saveRequest,
  findWaitingAndActiveRequest,
  closeRequest,
};
