const express = require('express');
const personalController = require('../controllers/personalController');
const auth = require('../middleware/auth');

const router = express.Router();

//register
router.post('/register', personalController.register_post);

//login
router.post('/login', personalController.login_post);

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, personalController.get_dashboard);

module.exports = router;