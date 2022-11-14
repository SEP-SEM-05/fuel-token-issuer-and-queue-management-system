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

//get unread notification count that matches a given regNo(nic)
const getUnreadNotificationCount = async (regNo) => {

    let count = await Notification.count({regNo: regNo, isRead: false});
    return count;
}

//get all the notifications given a regNo(nic)
const getNotifications = async (regNo) => {

    let notifications = await Notification.find({regNo: regNo}).sort({createdAt: 'desc'});
    return notifications;
}

//mark notification as read given a regNo(nic)
const mark_as_read = async (regNo) => {

    let result = await Notification.updateMany({regNo: regNo}, {isRead: true});
    return result;
}

module.exports = { addNewNotification, addNewNotifications, getUnreadNotificationCount, getNotifications, mark_as_read };