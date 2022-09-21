const express = require('express');
const orgController = require('../controllers/orgController');
const auth = require('../middleware/auth');

const router = express.Router();

//register
router.post('/register', orgController.register_post);

//login
router.post('/login', orgController.login_post);

//get dashboard info
router.get('/dashboard/:id', auth.requireAuth, orgController.get_dashboard);

module.exports = router;