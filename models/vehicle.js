const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//need to update remaining quota with full quota weekly automatically
const vehicleSchema = new Schema({
    registrationNo: {
        type: String,
        required: true,
        unique: true
    },
    engineNo: {
        type: String,
        required: true,
        unique: true
    },
    ownerNIC: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 1
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    lastFilledDate: {
        type: Date,
        default: null
    },
    usedQuota: {
        type: Number,
        default: 0
    },
    stations: {
        type: [String],
        default: []
    },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;