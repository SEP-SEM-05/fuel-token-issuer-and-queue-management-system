const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    // vehicleType: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // fuelType: {
    //     type: String,
    //     required: true
    // },
    // amount: {
    //     type: Number,
    //     required: true
    // }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;

//define state