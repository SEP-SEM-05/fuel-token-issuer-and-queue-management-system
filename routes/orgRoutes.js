const express = require('express');
const orgController = require('../controllers/orgController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, orgController.get_dashboard);
// router.get('/dashboard/:id', orgController.get_dashboard);

//get vehicle info
router.get('/getVehicles/:id', auth.requireAuth, orgController.get_vehicles);
// router.get('/getVehicles/:id', orgController.get_vehicles);

//change stations
router.post('/changeStations', auth.requireAuth, orgController.change_stations);
// router.post('/changeStations', orgController.change_stations);

//request fuel for an organization
router.post('/requestFuel', auth.requireAuth, orgController.request_fuel);
// router.post('/requestFuel',, orgController.request_fuel);

//get unread notification count
router.get('/notifyCount/:id', auth.requireAuth, orgController.get_unread_notification_count);
// router.get('/notifyCount/:id', orgController.get_unread_notification_count);

//get all notifications
router.get('/notifications/:id', auth.requireAuth, orgController.get_all_notifications);
// router.get('/notifications/:id', orgController.get_all_notifications);

module.exports = router;