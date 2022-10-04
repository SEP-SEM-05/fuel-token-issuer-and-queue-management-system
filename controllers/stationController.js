let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const stationDBHelper = require("../services/stationDBHelper");
const vehicleDBHelper = require("../services/vehicleDBHelper");

const auth = require("../middleware/auth");
const encHandler = require("../middleware/encryptionHandler");

//get station dashboard info
const get_dashboard = async (req, res) => {
console.log(req.params.id)
  let id = req.params.id;

  try {
    let user = await stationDBHelper.findStationByID(id);
    if (user !== null) {
      res.json({
        status: "ok",
        user: user,
       // fuel_types
      });
    } else {
      res.status(400).json({
        status: "error",
        error: "Invalid User!",
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      error: "Internal server error!",
    });
  }
};

//Increse the fuel amount
const update_fuel_amount = async (req, res) => {
  let regNo = req.body.registrationNo;
  let fuelType = req.body.fuelType;
  let addedAmount = req.body.addedAmount;

  try {
    //handle any possible errors
    let result = await vehicleDBHelper.updateAmount(regNo, fuelType, addedAmount);
    //return necessary data
    res.json({
      status: "ok",
    });
  } catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            error: 'Internal server error!'
        });
    }
};

module.exports = {
  get_dashboard,
  update_fuel_amount,
};
