const express = require('express');
const personalController = require('../controllers/personalController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, personalController.get_dashboard);

//register a vehicle and add stations to it
router.post('/addVehicle', auth.requireAuth, personalController.add_vehicle_and_change_stations);

//change stations of an alredy registered vehicle
router.post('/changeStations', auth.requireAuth, personalController.add_vehicle_and_change_stations);

module.exports = router;