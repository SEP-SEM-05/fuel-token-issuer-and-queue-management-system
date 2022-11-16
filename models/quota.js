const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotaSchema = new Schema({
    vehicleType: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Quota = mongoose.model('Quota', quotaSchema);
module.exports = Quota;