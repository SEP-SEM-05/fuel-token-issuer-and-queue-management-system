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
    isRegistered: {
        type: Boolean,
        default: false
    },
    volumes: {
        type: Map,
        of: Number,
        default: {
            'Lanka Auto Diesel': 0,
            'Lanka Super Diesel': 0,
            'Petrol 92 Octane': 0,
            'Petrol 95 Octane': 0
        }
    }
}, { timestamps: true });

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;