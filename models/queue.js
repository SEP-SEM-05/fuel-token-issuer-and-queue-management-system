const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema({
    stationID: {
        type: String,
        required: true,
        unique: true
    },
    fuelType: {
        type: String,
        required: true
    },
    vehicles: {
        type: [String],
        default: []
    },
}, { timestamps: true });

const Queue = mongoose.model('Queue', queueSchema);
module.exports = Queue;

// stationID
// fuelType
// vehicles[registrationNos]
// (station has four queues - one for each fuel type)