let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const Notification = require("../models/notification");

// add new notification
const addNewNotification = (data) =>{
    return new Promise(async (resolve, reject) => {

      let notification = new Notification(data);

      notification.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(notification._id);
        }
      });
    });
}

// add bulk of notifications
const addNewNotifications = async (dataArr) => {
    let arr = [];
    dataArr.forEach(noti => {
        let notification = new Notification(noti);
        arr.push(notification);
    });

    const result = await Notification.bulkSave(arr);
    return result;
}





module.exports = { addNewNotification, addNewNotifications };