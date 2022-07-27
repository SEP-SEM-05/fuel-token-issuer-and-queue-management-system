const express = require('express');
const clientController = require('../controllers/clientController');
const auth = require('../middleware/auth');

const router = express.Router();

//login
// router.post('/login', clientController.login_post);

// //get officer dashboard info
// router.get('/dashboard/:id', auth.requireAuth, clientController.get_dashboard);



module.exports = router;