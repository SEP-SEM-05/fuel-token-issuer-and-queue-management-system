const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    registrationNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
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
    lastFilledDate: {
        type: Map,
        of: Date,
        default: {
            'Petrol': null,
            'Diesel': null
        }
    },
    vehicles: {
        type: [String],
        default: []
    },
    stations: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Organizatioin = mongoose.model('Organization', organizationSchema);
module.exports = Organizatioin;