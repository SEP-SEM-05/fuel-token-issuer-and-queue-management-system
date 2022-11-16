let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const personalDBHelper = require('../services/personalDBHelper');
const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');
const queueDBHelper = require('../services/queueDBHelper');
const requestDBHelper = require('../services/requestDBHelper');
const notificationDBHelper = require('../services/notificationDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get personal client dashboard info
//vehicles string array - for each vehicle calculate the full quota and the remaining quota
//stations string array
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try {

        let user = await personalDBHelper.findClientByID(id);

        if (user !== null) {

            let vehicles = await vehicleDBHelper.findAllByNic(user.nic);
            let stations = await stationDBHelper.findAllRegisteredStations();
            let quotas = await vehicleDBHelper.getQuotas();

            let return_vehicles = [];
            vehicles.forEach((vehicle) => {

                let return_vehicle = {};

                //select the corresponding quota from quotas
                //add amount as fullQuota
                //calculate and add remaining quota using vehicle.usedQuota

                let fullQuota;
                for (const i in quotas) {

                    if (quotas[i].vehicleType === vehicle.type && quotas[i].fuelType === vehicle.fuelType) {

                        fullQuota = quotas[i].amount;
                        break;
                    }
                }

                return_vehicle['fullQuota'] = fullQuota;
                return_vehicle['remainingQuota'] = fullQuota - vehicle.usedQuota;

                //stations array must contain strings with regNo and name concatde with '-'
                let vehicle_stations = [];
                stations.forEach((station) => {

                    if (vehicle.stations.includes(station.registrationNo)) {
                        vehicle_stations.push(station.registrationNo + '-' + station.name + ' ' + station.location);
                    }
                })

                for (const key in vehicle._doc) {
                    return_vehicle[key] = vehicle[key];
                }
                return_vehicle['stations'] = vehicle_stations;

                return_vehicles.push(return_vehicle);
            })

            //create a string array containing all the stations
            //each string must contain regNo and name concated with '-'
            let return_stations = [];
            stations.forEach((station) => {
                return_stations.push(station.registrationNo + '-' + station.name + ' ' + station.location);
            })

            res.json({
                status: 'ok',
                nic: user.nic,
                vehicles: return_vehicles,
                stations: return_stations
            });
        }
        else {
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//register a vehicle to the system
const add_vehicle = async (req, res) => {

    let nic = req.body.nic
    let regNo = req.body.registrationNo;
    let engineNo = req.body.engineNo;
    let req_stations = req.body.stations;

    try {

        let vehicle = await vehicleDBHelper.findVehicleByRegNoAndEngNo(regNo, engineNo);

        if (!vehicle) {
            res.status(400).json({
                status: 'error',
                error: 'Invalid registration No. or engine No.!'
            });
        }
        else if (nic !== vehicle.ownerNIC) {
            res.status(400).json({
                status: 'error',
                error: 'Invalid Owner!'
            });
        }
        else if (vehicle.isRegistered) {
            res.status(400).json({
                status: 'error',
                error: 'Vehicle has already registered!'
            });
        }
        else {

            let stations = [];

            for(let i = 0; i < req_stations.length; i++){
                let station_regNo = req_stations[i].split('-')[0].trim();
                stations.push(station_regNo);
            }

            let result = await vehicleDBHelper.updateStationsAndRegister(regNo, stations);
            res.json({
                status: 'ok',
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//add change stations of a registered vehicle
const change_stations = async (req, res) => {

    let nic = req.body.nic;
    let regNo = req.body.registrationNo;
    let req_stations = req.body.stations;

    try {

        let user = await personalDBHelper.findClientByNic(nic);

        if (user !== null) {

            let stations = [];

            for(let i = 0; i < req_stations.length; i++){
                let station_regNo = req_stations[i].split('-')[0].trim();
                stations.push(station_regNo);
            }

            let result = await vehicleDBHelper.updateStationsAndRegister(regNo, stations);

            res.json({
                status: 'ok',
            });
        }
        else {
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//request fuel for a vehicle
const request_fuel = async (req, res) => {

    let nic = req.body.vehicle.ownerNIC;
    let regNo = req.body.vehicle.registrationNo;
    let fuelType = req.body.fuelType;
    let remainingQuota = req.body.vehicle.remainingQuota;
    let req_stations = req.body.vehicle.stations;
    let priority = req.body.vehicle.priority;
    let userType = 'personal';

    try {

        //find any opened requests - if any, error
        let result = await requestDBHelper.findWaitingAndActiveRequest(regNo, userType);

        if (!result) {

            let stations = [];

            for(let i = 0; i < req_stations.length; i++){
                let station_regNo = req_stations[i].split('-')[0].trim();
                stations.push(station_regNo);
            }

            let reqDetails = {
                userID: nic,
                userType: userType,
                registrationNo: regNo,
                quota: remainingQuota,
                fuelType,
                requestedStations: stations,
                priority
            };

            //save request, get _id and add to client details
            let reqId = await requestDBHelper.saveRequest(reqDetails);

            // check if there are any announced queues - add to all of them - store notification for each
            // if not add to all the waiting queues of the selected stations

            let all_station_queues = await queueDBHelper.findQueuesByRegNoAndFuel(stations, fuelType);

            let announced_queue_ids = [];
            let queue_announced_stations = [];

            let notifications = [];

            for(let i = 0; i < all_station_queues.length; i++){

                //check if the remaining quota is less than or equals to the selected amount of the queue
                if(all_station_queues[i].state === "announced" && parseFloat(all_station_queues[i].selectedAmount) >= remainingQuota){

                    announced_queue_ids.push(all_station_queues[i]._id);
                    queue_announced_stations.push(all_station_queues[i].stationID);

                    let station_str = "";
                    for(let k = 0; k < req_stations.length; k++){

                        let req_station = req_stations[k].split('-')[0].trim();

                        if(all_station_queues[i].stationID === req_station){
                            station_str = req_stations[k];
                            break;
                        }
                    }

                    let vehicle_count = parseInt(all_station_queues[i].vehicleCount);
                    let start_time = new Date(all_station_queues[i].queueStartTime);
                    let curr_end_time = new Date(all_station_queues[i].estimatedEndTime);
                    let est_time_for_vehicle = Math.abs(Math.round((start_time.getTime() - curr_end_time.getTime()) / (1000 * 60 * vehicle_count)));
                    let new_end_time = curr_end_time.setMinutes(curr_end_time.getMinutes() + est_time_for_vehicle);

                    //update the new end time
                    await queueDBHelper.updateEndTime(new_end_time, all_station_queues[i]._id);

                    let notify_start_time = start_time.toString().split("GMT")[0];
                    let notify_end_time = curr_end_time.toString().split("GMT")[0];

                    //create notification
                    let notification = {};
                    notification['regNo'] = nic;
                    notification['title'] = "Queue Announcement";
                    notification['msg'] = `${station_str} will start fuel distribution on ${notify_start_time} and you will be able to take your ${remainingQuota} Liters of ${fuelType} quota around ${notify_end_time} to your ${regNo} vehicle`;

                    notifications.push(notification);
                }
            }
            
            //save notifications
            await notificationDBHelper.addNewNotifications(notifications);

            let waiting_queue_ids = [];
            for(let i = 0; i < all_station_queues.length; i++){

                if(!queue_announced_stations.includes(all_station_queues[i].stationID)){
                    waiting_queue_ids.push(all_station_queues[i]._id);
                }
            }

            await queueDBHelper.addToQueue(announced_queue_ids.concat(waiting_queue_ids), reqId);

            res.json({
                status: 'ok',
            });
        }
        else {
            res.status(400).json({
                status: 'error',
                error: 'Multiple requests are not allowed!'
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

// get unread notification count
const get_unread_notification_count = async (req, res) => {

    let id = req.params.id;

    try {

        let user = await personalDBHelper.findClientByID(id);

        if (user !== null) {

            let count = await notificationDBHelper.getUnreadNotificationCount(user.nic);

            res.json({
                status: 'ok',
                notifyCount: count,
            });
        }
        else {
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//get all notifications
const get_all_notifications = async (req, res) => {

    let id = req.params.id;

    try {

        let user = await personalDBHelper.findClientByID(id);

        if (user !== null) {

            let notifications = await notificationDBHelper.getNotifications(user.nic);

            let return_notifications = [];
            for(let i = 0; i < notifications.length; i++){

                let created_date = new Date(notifications[i].createdAt);
                
                let hours24 = created_date.getHours();
                let hours12 = (hours24 === 0 ? 0 : hours24 > 12 ? hours24 - 12 : hours24);
                let minutes = created_date.getMinutes();
                let am_pm = (hours24 < 12 ? "AM" : "PM");
                let time_created = String(hours12).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + " " + am_pm;

                let return_not = {};

                return_not['_id'] = notifications[i]._id;
                return_not['isRead'] = notifications[i].isRead;
                return_not['title'] = notifications[i].title;
                return_not['msg'] = notifications[i].msg;
                return_not['time'] = time_created;

                return_notifications.push(return_not);
            }

            await notificationDBHelper.mark_as_read(user.nic);

            res.json({
                status: 'ok',
                notifications: return_notifications,
            });
        }
        else {
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

module.exports = {
    get_dashboard,
    add_vehicle,
    change_stations,
    request_fuel,
    get_unread_notification_count,
    get_all_notifications,
}