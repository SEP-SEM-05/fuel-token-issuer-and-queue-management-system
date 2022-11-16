const { Double } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//add name attribute
const stationSchema = new Schema(
  {
    registrationNo: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    capasities: {
      type: Map,
      of: Number, //this is a float value
      required: true,
      default: {
        "Auto Diesel": 0,
        "Super Diesel": 0,
        "Petrol 92 Octane": 0,
        "Petrol 95 Octane": 0,
      },
    },
    volumes: {
      type: Map,
      of: Number, //this is a float value
      default: {
        "Auto Diesel": 0,
        "Super Diesel": 0,
        "Petrol 92 Octane": 0,
        "Petrol 95 Octane": 0,
      },
    },
    lastFilled: {
      type: Map,
      of: Date,
      default: {
        "Auto Diesel": null,
        "Super Diesel": null,
        "Petrol 92 Octane": null,
        "Petrol 95 Octane": null,
      },
    },
    lastAnnounced: {
      type: Map,
      of: Date,
      default: {
        "Auto Diesel": null,
        "Super Diesel": null,
        "Petrol 92 Octane": null,
        "Petrol 95 Octane": null,
      },
    },
  },
  { timestamps: true }
);

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
