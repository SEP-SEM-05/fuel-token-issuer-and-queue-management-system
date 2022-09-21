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
    state: {
        type: String,
        default: "waiting"
    },
}, { timestamps: true });

const Queue = mongoose.model('Queue', queueSchema);
module.exports = Queue;