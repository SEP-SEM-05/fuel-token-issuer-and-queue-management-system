const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
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

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;