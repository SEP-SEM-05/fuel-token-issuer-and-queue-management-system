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
            Super_diesel: 0,
            Octane92: 0,
            Octane95: 0
        }
    },
    issueQuota: {
        type: Map,
        of: Number,
        default: {
            Diesel: 0,
            Super_diesel: 0,
            Octane92: 0,
            Octane95: 0
        }
    },
}, { timestamps: true });

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;

// registerationNo
// password
// email
// location
// contactNo
// volume: obj(contains all fuel types)
// issueQuota: obj(contains all fuel types)