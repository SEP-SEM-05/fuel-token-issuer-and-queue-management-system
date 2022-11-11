const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
      type: String,
      required: false,
    },
    noOfVehicles: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Personal = mongoose.model('Personal', personalSchema);
module.exports = Personal;