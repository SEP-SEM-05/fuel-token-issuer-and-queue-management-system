const express = require('express');
const orgController = require('../controllers/orgController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, orgController.get_dashboard);

//change stations
router.post('/changeStatioins', auth.requireAuth, orgController.change_stations);

module.exports = router;