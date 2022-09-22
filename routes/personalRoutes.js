const express = require('express');
const personalController = require('../controllers/personalController');
const auth = require('../middleware/auth');

const router = express.Router();

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, personalController.get_dashboard);

module.exports = router;