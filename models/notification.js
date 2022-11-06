const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    regNo: {        //this can be NIC or org reg no
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    estEndTime: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;

//define state