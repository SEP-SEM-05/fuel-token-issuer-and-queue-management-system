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

module.exports = {
  getAllReqByIds,
  getStationsOfReq,
};
