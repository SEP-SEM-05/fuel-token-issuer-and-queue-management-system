const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    userType: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    registrationNo: {
      type: String,
      required: true,
    },
    quota: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    requestedStations: {
      type: [String],
      required: true,
    },
    filledStation: {
      type: String,
      default: null,
    },
    isFilled: {
      type: Boolean,
      default: false,
    },
    filledDate: {
      type: Date,
      default: null,
    },
    filledAmount: {
      type: Number,
      default: 0,
    },
    timeOutCount: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      enum: ["waiting", "active", "closed", "rejected"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;

//request should contain attributes to record userType, registrationNo, remainingQuota, fuelType, requested stations, filled station, isFilled, filledDate and filled amount