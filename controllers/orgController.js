let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const orgDBHelper = require('../services/orgDBHelper');
const stationDBHelper = require('../services/stationDBHelper');
const vehicleDBHelper = require('../services/vehicleDBHelper');
const notificationDBHelper = require('../services/notificationDBHelper');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');


//get organization dashboard info
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await orgDBHelper.findClientByID(id);

        if(user !== null){

            let vehicles = await vehicleDBHelper.findAllByregistrationNoArray(user.vehicles);
            let stations = await stationDBHelper.findAllRegisteredStations();
            let quotas = await vehicleDBHelper.getQuotas();

            let fullQuotas = {};
            let fullQuotaDiesel = 0;
            let fullQuotaPetrol = 0;
            vehicles.forEach((vehicle) => {

                //select the corresponding quota from quotas
                //add amount to the fullQuota
                //calculate and add total used quota using vehicle.usedQuota

                for(const i in quotas){
                    
                    if(quotas[i].vehicleType === vehicle.type && quotas[i].fuelType === vehicle.fuelType){

                        if(quotas[i].fuelType === 'Diesel'){
                            fullQuotaDiesel += quotas[i].amount;
                        }
                        else{
                            fullQuotaPetrol += quotas[i].amount;
                        }
                        break;
                    }
                }
            });

            fullQuotas['fullDieselQuota'] = fullQuotaDiesel;
            fullQuotas['fullPetrolQuota'] = fullQuotaPetrol;

            //if the quotas have changed update them in the org collection
            if(user.fullQuotas[0] !== fullQuotaDiesel || user.fullQuotas[1] !== fullQuotaPetrol){

                try {

                    let update_result = await orgDBHelper.updateFullQuotas(user.registrationNo, [fullQuotaDiesel, fullQuotaPetrol]);
                    console.log("Full quotas updated - orgController 62");
                } 
                catch (err) {
                    console.log(err);
                    res.status(500).json({
                        status: 'error',
                        error: 'Internal server error!'
                    });
                }
            }

            //stations array must contain strings with regNo and name concatde with '-'
            let org_stations = [];
            stations.forEach((station) => {

                if(user.stations.includes(station.registrationNo)){
                    org_stations.push(station.registrationNo + '-' + station.name + ' ' + station.location);
                }
            });

            //create a string array containing all the stations
            //each string must contain regNo and name concated with '-'
            let return_stations = [];
            stations.forEach((station) => {
                return_stations.push(station.registrationNo + '-' + station.name + ' ' + station.location);
            })

            let lastFilledDateObj = user.lastFilledDate.toJSON();

            let petrol_lfd = new Date(lastFilledDateObj.Petrol);
            let diesel_lfd = new Date(lastFilledDateObj.Diesel);

            let lastFilledDate = (petrol_lfd > diesel_lfd ? petrol_lfd : diesel_lfd);
            let return_lfd = String(lastFilledDate.getFullYear()) + " - " + String(lastFilledDate.getMonth() + 1).padStart(2, '0') + " - " + String(lastFilledDate.getDate()).padStart(2, '0');

            res.json({
                status: 'ok',
                org_regNo: user.registrationNo,
                orgStations: org_stations,
                vehicleCount: vehicles.length,
                fullQuotas: fullQuotas,
                lastFilledDate: return_lfd,
                remainingQuotas: user.remainingQuotas,
                stations: return_stations,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//get organization vehicle details
const get_vehicles = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await orgDBHelper.findClientByID(id);

        if(user !== null){

            let vehicles = await vehicleDBHelper.findAllByregistrationNoArray(user.vehicles);
            let quotas = await vehicleDBHelper.getQuotas();

            let return_vehicles = []

            vehicles.forEach((vehicle) => {

                let return_vehicle = {};

                for(const i in quotas){

                    if(quotas[i].vehicleType === vehicle.type && quotas[i].fuelType === vehicle.fuelType){
                        
                        return_vehicle['weeklyQuota'] = quotas[i].amount;
                        break;
                    }
                }

                return_vehicle['registrationNo'] = vehicle.registrationNo;
                return_vehicle['type'] = vehicle.type;
                return_vehicle['fuelType'] = vehicle.fuelType;

                let lastFilledDateObj = user.lastFilledDate.toJSON();
                let lastFilledDate = vehicle.type === "Petrol" ? new Date(lastFilledDateObj.Petrol) : new Date(lastFilledDateObj.Diesel);
                let return_lfd = String(lastFilledDate.getFullYear()) + " - " + String(lastFilledDate.getMonth() + 1).padStart(2, '0') + " - " + String(lastFilledDate.getDate()).padStart(2, '0');
                
                return_vehicle['lastFilledDate'] = return_lfd;

                return_vehicles.push(return_vehicle);
            })

            res.json({
                status: 'ok',
                vehicles: return_vehicles,
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
}

//change stations for an organization
const change_stations = async (req, res) => {

    let regNo = req.body.registrationNo;
    let req_stations = req.body.stations;

    try{

        let user = await orgDBHelper.findClientByRegNo(regNo);

        if(user !== null){

            let stations = [];

            for(let i = 0; i < req_stations.length; i++){
                let station_regNo = req_stations[i].split('-')[0].trim();
                stations.push(station_regNo);
            }

            let result = await orgDBHelper.updateStations(regNo, stations);
            
            res.json({
                status: 'ok'
            });
        }
        else{
            res.status(400).json({
                status: 'error',
                error: 'Invalid User!'
            });
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }

    // try {
    //     //handle any possible errors
    //     let result = await orgDBHelper.updateStations(regNo, stations);
    //     //return necessary data
    //     res.json({
    //         status: 'ok',
    //     });
    // } 
    // catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         status: 'error',
    //         error: 'Internal server error!'
    //     });
    // }
}

//request fuel for an organization
const request_fuel = async (req, res) => {

    let regNo = req.body.registrationNo;
    let fuelType = req.body.fuelType;
    let remainingQuota = req.body.vehicle.remainingQuota;
    let req_stations = req.body.stations;
    let priority = req.body.priority;
    let userType = 'organization';

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
                userID: regNo,
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
                    notification['regNo'] = regNo;
                    notification['title'] = "Queue Announcement";
                    notification['msg'] = `${station_str} will start fuel distribution on ${notify_start_time} and you will be able to take your ${remainingQuota} Liters of ${fuelType} quota around ${notify_end_time} to your Organization`;

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

        let user = await orgDBHelper.findClientByID(id);

        if (user !== null) {

            let count = await notificationDBHelper.getUnreadNotificationCount(user.registrationNo);

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

        let user = await orgDBHelper.findClientByID(id);

        if (user !== null) {

            let notifications = await notificationDBHelper.getNotifications(user.registrationNo);

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

            await notificationDBHelper.mark_as_read(user.registrationNo);

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
    get_vehicles,
    change_stations,
    request_fuel,
    get_unread_notification_count,
    get_all_notifications,
}