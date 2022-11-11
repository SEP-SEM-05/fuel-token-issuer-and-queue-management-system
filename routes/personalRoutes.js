const express = require('express');
const personalController = require('../controllers/personalController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, personalController.get_dashboard);
// router.get('/dashboard/:id', personalController.get_dashboard);

//register a vehicle and add stations to it
router.post('/addVehicle', auth.requireAuth, personalController.add_vehicle);
// router.post('/addVehicle', personalController.add_vehicle);

//change stations of an alredy registered vehicle
router.post('/changeStations', auth.requireAuth, personalController.change_stations);
// router.post('/changeStations', personalController.change_stations);

//request fuel for a vehicle
router.post('/requestFuel', auth.requireAuth, personalController.request_fuel);
// router.post('/requestFuel', personalController.request_fuel);

//get unread notification count
router.get('/notifyCount/:id', auth.requireAuth, personalController.get_unread_notification_count);
// router.get('/notifyCount/:id', personalController.get_unread_notification_count);

//get all notifications
router.get('/notifications/:id', auth.requireAuth, personalController.get_all_notifications);
// router.get('/notifications/:id', personalController.get_all_notifications);

module.exports = router;