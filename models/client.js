const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  noOfVehicles: {
    type: String,
    default: 0
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;