const express = require('express');

const adminController = require('../controllers/adminController');

const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
//router.get('/dashboard', auth.requireAuth, adminController.get_dashboard);
router.get('/dashboard', adminController.get_dashboard);



module.exports = router;