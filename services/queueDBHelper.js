let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const Queue = require("../models/queue");

// get all the 4 queues of a given station
const findQueuesByStRegNo = async (stId, stat) => {
    let queues = await Queue.find({ stationID: stId, state: stat });
    return queues;
}

// add new announced queue
const addNewAnnouncedQueue = (regNo, ftype, requests, stime, etime) => {
  
  return new Promise(async (resolve, reject) => { 
    let data = {
      stationID: regNo,
      fuelType: ftype,
      requests: requests,
      queueStartTime: stime,
      estimatedEndTime: etime,
      state: "announced",
    };

    let queue = new Queue(data);

    queue.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(queue._id);
      }
    });
  });
}

// remove announced requests from waiting queue
const removeReqsFromWaitingQueue = async (regNo, ftype, reqs) => { 
  let wq = await Queue.findOne({ 
    stationID: regNo,
    state: "waiting",
    fuelType: ftype,
  });

  let reqArr = wq.requests;
  let reqsToDeleteSet = new Set(reqs);

  let filteredReqs = reqArr.filter((name) => {
    return !reqsToDeleteSet.has(name);
  });

  let result = await Queue.findOneAndUpdate(
    { stationID: regNo, state: "waiting", fuelType: ftype },
    { requests: filteredReqs },
    { new: true }
  );
  return result.requests;
}


module.exports = {
  findQueuesByStRegNo,
  addNewAnnouncedQueue,
  removeReqsFromWaitingQueue
};
