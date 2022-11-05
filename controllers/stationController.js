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
  let addedAmount = parseFloat(req.body.addedAmount); 

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
      newAmounts: result,
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
  let regNo = req.params.regNo;

  try {
    //handle any possible errors
    let station = await stationDBHelper.findStationByRegNo(regNo);

    let result = await queueDBHelper.findQueuesByStRegNo(regNo, 'waiting');
    vehicle_counts = {
      "Auto Diesel": 0,
      "Super Diesel": 0,
      "Petrol 92 Octane": 0,
      "Petrol 95 Octane": 0,
    };
    p_queues = {
      "Auto Diesel": [],
      "Super Diesel": [],
      "Petrol 92 Octane": [],
      "Petrol 95 Octane": [],
    };

    for (let i = 0; i < result.length; i++ ) {
      let queue = result[i]
      let req_arr = await requestDBHelper.getAllReqByIds(queue.requests); 

      const req_priority_queue = new MaxPriorityQueue((re) => re.priority);
      req_arr.forEach((reqest) => {
        let temp = {
          reqId:reqest._id.toString(),
          registrationNo: reqest.registrationNo,
          quota: reqest.quota,
          priority: reqest.priority,
        };
        req_priority_queue.enqueue(temp);
      });

      p_queues[queue.fuelType] = req_priority_queue.toArray();
      vehicle_counts[queue.fuelType] = req_priority_queue.size();
    }

    //return necessary data
    res.json({
      status: "ok",
      vehicleCounts: vehicle_counts,
      queues: p_queues,
      lastDates: station.lastAnnounced,
      availableAmounts: station.volumes
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      error: "Internal server error!",
    });
  }
}

// announce a queue 
const announce_fuel_queue = async (req, res) => {
  //console.log(req.body);
  regNo = req.body.regNo;
  ftype = req.body.fuelType;
  lastAnnounced = req.body.announcedTime;
  vehicles = req.body.vehicles;
  stime = req.body.startTime;
  etime = req.body.estQueueEndTime;

  try {

    let result1 = await stationDBHelper.updateLastAnnounced(regNo, ftype, lastAnnounced);   // update last announced date
    // console.log(result1);

    let reqs = [];
    let etimes = {};

    vehicles.forEach(veh => {
      reqs.push(veh.reqId);
      etimes[veh.registrationNo] = new Date(veh.estTime);
    });

    let result2 = await queueDBHelper.addNewAnnouncedQueue(regNo, ftype, reqs, stime, etime); // start a new announced queue
    // console.log(result2);

    let result3 = await queueDBHelper.removeReqsFromWaitingQueue(regNo, ftype, reqs);
    // console.log(result3);

    // etimes.forEach((ve) => {
      
    // });
    
    
    //return necessary data
    res.json({
      status: "ok"
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
    announce_fuel_queue,
  };
