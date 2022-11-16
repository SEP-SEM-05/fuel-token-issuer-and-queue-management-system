const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const queueSchema = new Schema(
  {
    fuelType: {
      type: String,
      required: true,
    },
    stationID: {
      type: String,
      required: true,
    },
    requests: {
      type: [String],
      default: [],
    },
    vehicleCount: {
      type: String,
      default: "0",
    },
    selectedAmount: {
      type: String,
      default: "0",
    },
    queueStartTime: {
      type: Date,
      default: null,
    },
    estimatedEndTime: {
      type: Date,
      default: null,
    },
    state: {
      type: String,
      enum: ["waiting", "announced", "active", "ended"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

const Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;
