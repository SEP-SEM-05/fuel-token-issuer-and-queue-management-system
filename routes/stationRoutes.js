const express = require('express');
const stationController = require('../controllers/stationController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, stationController.get_dashboard);

module.exports = router;