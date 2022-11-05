const express = require('express');
const stationController = require('../controllers/stationController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, stationController.get_dashboard);

//update fuel amount
router.post("/updateamount", auth.requireAuth, stationController.update_fuel_amount);

// get fuel waiting queues
router.get("/fuelqueues/:id",auth.requireAuth, stationController.get_waiting_queues); 

module.exports = router;