const express = require('express');
const personalController = require('../controllers/personalController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, personalController.get_dashboard);

//register a vehicle and add stations to it or change stations of an alredy registered one
router.post('/changeStatioins', auth.requireAuth, personalController.register_and_change_stations);

module.exports = router;