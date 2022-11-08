const express = require('express');

const adminController = require('../controllers/adminController');

const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:fueltype', auth.requireAuth, adminController.get_dashboard);
//router.get('/dashboard/:fueltype', adminController.get_dashboard);

//get registered station info
router.get('/registered', auth.requireAuth, adminController.get_registered_station);

//get unregistered station info
router.get('/unregistered', auth.requireAuth, adminController.get_unregistered_station);

//get count of registered stations
router.get('/count/:stationType', auth.requireAuth, adminController.get_count_registered_station);


module.exports = router;