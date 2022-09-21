const express = require('express');
const stationController = require('../controllers/stationController');
const auth = require('../middleware/auth');

const router = express.Router();

//login
// router.post('/login', clientController.login_post);

// //get officer dashboard info
// router.get('/dashboard/:id', auth.requireAuth, clientController.get_dashboard);



module.exports = router;