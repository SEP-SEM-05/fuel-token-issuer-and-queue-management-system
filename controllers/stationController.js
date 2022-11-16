let mongoose = require("mongoose");
let { MaxPriorityQueue } = require("@datastructures-js/priority-queue");

mongoose.Promise = global.Promise;
require("dotenv").config();

const stationDBHelper = require("../services/stationDBHelper");
const personalDBHelper = require("../services/personalDBHelper");
const orgDBHelper = require("../services/orgDBHelper");
const vehicleDBHelper = require("../services/vehicleDBHelper");
const queueDBHelper = require("../services/queueDBHelper");
const requestDBHelper = require("../services/requestDBHelper");
const notificationDBHelper = require("../services/notificationDBHelper");

const auth = require("../middleware/auth");
const encHandler = require("../middleware/encryptionHandler");

//get station dashboard info
const get_dashboard = async (req, res) => {

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
    } catch (err) {
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

        let result = await queueDBHelper.findQueuesByStRegNo(regNo, ['waiting']);
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

        for (let i = 0; i < result.length; i++) {
            let queue = result[i]
            let req_arr = await requestDBHelper.getAllReqByIds(queue.requests);

            const req_priority_queue = new MaxPriorityQueue((re) => re.priority);
            req_arr.forEach((reqest) => {
                let temp = {
                    reqId: reqest._id.toString(),
                    userID: reqest.userID,
                    quota: reqest.quota,
                    priority: reqest.priority,
                };
                if (reqest.registrationNo) {
                    temp['registrationNo'] = reqest.registrationNo;
                }
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
    selectedAmount = req.body.fuelAmount;
  
    try {
  
      let result1 = await stationDBHelper.updateLastAnnounced(regNo, ftype, lastAnnounced);   // update last announced date
      // console.log(result1);
  
      let reqs = [];
      let dataArr = [];
  
      vehicles.forEach(veh => {
        reqs.push(veh.reqId);
        if(veh.registrationNo){
          dataArr.push({
            regNo: veh.userID,
            userType: "personal",
            title: "Queue Announcement",
            msg: `${result1.registrationNo} ${result1.name} - ${result1.location} will start fuel distribution on ${stime} and you will be able to take your ${veh.quota} Liters of ${ftype} quota around ${veh.estTime} to your ${veh.registrationNo} vehicle`,
          });
        }else{
          dataArr.push({
            regNo: veh.userID,
            userType: "organization",
            title: "Queue Announcement",
            msg: `${result1.registrationNo} ${result1.name} - ${result1.location} will start fuel distribution on ${stime} and you will be able to take your ${veh.quota} Liters of ${ftype} quota around ${veh.estTime} to your Organization`,
          });
        }
      });
  
      let result2 = await queueDBHelper.addNewAnnouncedQueue(regNo, ftype, reqs, stime, etime, vehicles.length, selectedAmount); // start a new announced queue
      // console.log(result2);
  
      let result3 = await notificationDBHelper.addNewNotifications(dataArr);
      // console.log(result3);
  
      let result4 = await queueDBHelper.removeReqsFromWaitingQueue(regNo, ftype, reqs);
      // for (let i = 0; i < reqs.length; i++) {
      //   let sts = await requestDBHelper.getStationsOfReq(reqs[i]);
        
      // }
      
      //return necessary data
      res.json({
        status: "ok",
        noti: result3,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        error: "Internal server error!",
      });
    }
  }

// get announced queues
const get_announced_queues = async (req, res) => {
    let regNo = req.params.regNo;

    try {
        let queues = await queueDBHelper.findQueuesByStRegNo(regNo, ["announced", "active"]);

        res.json({
            status: "ok",
            fuelQueues: queues,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            error: "Internal server error!",
        });
    }
}

// update a queue
const update_queue = async (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    let state = req.body.state;
    let estEndTime = req.body.estEndTime;

    try {
        //handle any possible errors
        let result = await queueDBHelper.updateQueue(
            id,
            state,
            estEndTime
        );
        //return necessary data
        res.json({
            status: "ok",
            state: result.state,
            estEndTime: result.estimatedEndTime,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            error: "Internal server error!",
        });
    }
}

// fullfill a fuel request
const fill_request = async (req, res) => {

    //#provided data
    //reg_no, queue_id, filled_amount, fuel_type, user_type
    let regNo = req.body.registrationNo; // vehicle or org
    let stationRegNo = req.body.stationRegNo;
    let queueId = req.body.queueID;
    let filledAmount = req.body.filledAmount;
    let fuelType = req.body.fuelType; //exact fuel type

    //#process
    //get the queue
    //get the req_id from the queue
    //get the vehicle, owner, org
    try {
        
        let queue = await queueDBHelper.findQueueById(queueId);

        if(queue){

            let queue_requests = await requestDBHelper.getAllReqByIds(queue.requests);

            if(queue_requests.length > 0){

                let selected_req = null;
                for(let i = 0; i < queue_requests.length; i++){

                    if(queue_requests[i].registrationNo === regNo && queue_requests[i].fuelType === fuelType && queue_requests[i].state !== "closed"){

                        selected_req = queue_requests[i];
                        break;
                    }
                }

                if(selected_req){

                    let userType = selected_req.userType;
                    let userId = selected_req.userID;

                    let user = null;
                    if(userType === "personal"){

                        user = await personalDBHelper.findClientByNic(userId);
                    }
                    else{

                        user = await orgDBHelper.findClientByRegNo(userId);
                    }

                    if(user){

                        let filledDate = new Date();
                        let isFilled = true;
                        let reqState = "closed";

                        await requestDBHelper.closeRequest(selected_req._id, stationRegNo, isFilled, filledDate, filledAmount, reqState);

                        if(userType === "personal"){
                            await vehicleDBHelper.updateFillingDetails(regNo, filledDate, filledAmount);
                        }
                        else{

                            let fuelTypeInd = 0;
                            let generalFuelType = "Diesel";
                            let fuelTypeSplitted = fuelType.split(" ");

                            if(fuelTypeSplitted.includes("Petrol")){
                                fuelTypeInd = 1;
                                generalFuelType = "Petrol";
                            }

                            let currLastFilledDate = user.lastFilledDate.toJSON();
                            currLastFilledDate.generalFuelType = filledDate;

                            let currRemainingQuotas = user.remainingQuotas;
                            currRemainingQuotas[fuelTypeInd] -= filledAmount;

                            await orgDBHelper.updateFillingDetails(regNo, currLastFilledDate, currRemainingQuotas);
                        }

                        //update selected amount of the queue
                        let newQueueSelectedAmount = parseFloat(queue.selectedAmount) - filledAmount;
                        await queueDBHelper.updateSlectedAmount(queue._id, newQueueSelectedAmount.toString());

                        //if selected amount less than or equals zero close the queue
                        if(newQueueSelectedAmount <= 0){
                            await queueDBHelper.updateQueue(queue._id, "ended", null);
                        }

                        res.json({
                            status: "ok",
                        });
                    }
                    else{

                        res.status(404).json({
                            status: "error",
                            error: "Client not found!",
                        });
                    }
                }
                else{

                    res.status(404).json({
                        status: "error",
                        error: "Fuel request does not exist or already closed!",
                    });
                }
            }
            else{

                res.status(400).json({
                    status: "error",
                    error: "Queue is empty!",
                });
            }
        }
        else{

            res.status(404).json({
                status: "error",
                error: "Queue not found!",
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

    //#validation
    //check if the request really exist
    //check if the queue contains the request
    //check if the request is already closed

    //#updates
    //req - filledStation, isFilled, filledDate, filledAmount, state
    //vehicle - lastFilledDate, usedQuota
    //org - lastFilledDate, remainigQuotas

    //remove the request from every other queue

}


module.exports = {
    get_dashboard,
    update_fuel_amount,
    get_waiting_queues,
    announce_fuel_queue,
    get_announced_queues,
    update_queue,
    fill_request,
};
