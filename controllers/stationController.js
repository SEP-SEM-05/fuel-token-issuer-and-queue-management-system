let mongoose = require("mongoose");
let {MaxPriorityQueue} = require("@datastructures-js/priority-queue");

mongoose.Promise = global.Promise;
require("dotenv").config();

const stationDBHelper = require("../services/stationDBHelper");
const vehicleDBHelper = require("../services/vehicleDBHelper");
const queueDBHelper = require("../services/queueDBHelper");
const requestDBHelper = require("../services/requestDBHelper");

const auth = require("../middleware/auth");
const encHandler = require("../middleware/encryptionHandler");

//get station dashboard info
const get_dashboard = async (req, res) => {
console.log(req.params.id)
  let id = req.params.id;

  try {
    let user = await stationDBHelper.findStationByID(id);
    if (user !== null) {
      res.json({
        status: "ok",
        user: user,
       // fuel_types
      });
    } else {
      res.status(400).json({
        status: "error",
        error: "Invalid User!",
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      error: "Internal server error!",
    });
  }
};

//Increse the fuel amount
const update_fuel_amount = async (req, res) => {
  let regNo = req.body.registrationNo;
  let fuelType = req.body.fuelType;
  let addedAmount = req.body.addedAmount;

  try {
    //handle any possible errors
    let result = await stationDBHelper.updateAmount(
      regNo,
      fuelType,
      addedAmount
    );
    //return necessary data
    res.json({
      status: "ok",
      newAmount: result.volumes,
    });
  } catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
};

// Waiting queues generate
const get_waiting_queues = async (req, res) => {
  let id = req.params.id;
  

  try {
    //handle any possible errors
    let result = await queueDBHelper.findQueuesByStRegNo(id, 'waiting');
    vehicle_counts = {};
    p_queues = [];

    for (let i = 0; i < result.length; i++ ) {
      let queue = result[i]
      let req_arr = await requestDBHelper.getAllReqByIds(queue.requests);

      const req_priority_queue = new MaxPriorityQueue((re) => re.priority);
      req_arr.forEach((reqest) => {
        let temp = {
          registrationNo: reqest.registrationNo,
          quota: reqest.quota,
          priority: reqest.priority,
        };
        req_priority_queue.enqueue(temp);
      });

      p_queues.push(req_priority_queue.toArray());
      vehicle_counts[queue.fuelType] = req_priority_queue.size();
    }

    //return necessary data
    res.json({
      status: "ok",
      vehicleCounts: vehicle_counts,
      queues: p_queues,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      error: "Internal server error!",
    });
  }
}


  module.exports = {
    get_dashboard,
    update_fuel_amount,
    get_waiting_queues,
  };
