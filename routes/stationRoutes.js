const express = require('express');
const stationController = require('../controllers/stationController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, stationController.get_dashboard);

//update fuel amount
router.post("/updateamount", auth.requireAuth, stationController.update_fuel_amount);

// get fuel waiting queues
router.get("/fuelqueues/:regNo",auth.requireAuth, stationController.get_waiting_queues); 

// announce a fuel queue
router.post("/announcequeue", auth.requireAuth, stationController.announce_fuel_queue);

// get announced queues
router.get("/announcedqueues/:regNo", auth.requireAuth, stationController.get_announced_queues); 

// update a queue
router.post("/updatequeue", auth.requireAuth, stationController.update_queue);

module.exports = router;