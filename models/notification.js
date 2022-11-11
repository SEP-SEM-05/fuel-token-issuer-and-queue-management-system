const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    regNo: {        //this can be NIC or org reg no
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;

//define state