const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    registrationNo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    volume: {
        type: Map,
        of: Number,
        default: {
            Diesel: 0,
            Petrol: 0
        }
    }
}, { timestamps: true });

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;