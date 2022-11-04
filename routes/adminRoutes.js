const express = require('express');

const adminController = require('../controllers/adminController');

const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
//router.get('/dashboard', auth.requireAuth, adminController.get_dashboard);
router.get('/dashboard/:fueltype', adminController.get_dashboard);

//get registered station info
router.get('/registered', adminController.get_registered_station);

//get unregistered station info
router.get('/unregistered', adminController.get_unregistered_station);




module.exports = router;