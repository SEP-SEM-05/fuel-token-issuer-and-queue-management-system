const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    registrationNo: {
        type: String,
        required: true,
        unique: true
    },
    ownerNIC: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    lastFilledDate: {
        type: Date,
        default: null
    },
    stations: {
        type: [String],
        default: []
    },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;

// registrationNo
// ownerNIC
// fuelType
// stations[station registration Nos]
// isRegistered
// lastFilledDate