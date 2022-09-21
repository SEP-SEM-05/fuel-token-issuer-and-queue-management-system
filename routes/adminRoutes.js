const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

const router = express.Router();

login
router.post('/login', adminController.login_post);

// //get officer dashboard info
// router.get('/dashboard/:id', auth.requireAuth, clientController.get_dashboard);



module.exports = router;