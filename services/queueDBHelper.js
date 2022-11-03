let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const Queue = require("../models/queue");

// get all the 4 queues of a given station
const findQueuesByStRegNo = async (stId, stat) => {
    let queues = await Queue.find({ stationID: stId, state: stat });
    return queues;
}

module.exports = {
  findQueuesByStRegNo,
};
