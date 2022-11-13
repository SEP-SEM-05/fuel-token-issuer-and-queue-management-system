const express = require('express');

const authController = require('../controllers/authController');

const auth = require('../middleware/auth');

const router = express.Router();

//personal client register
router.post('/registerPersonal', authController.register_post_personal);

//organization register
router.post('/registerOrg', authController.register_post_org);

//admin  login
router.post('/loginAdmin', authController.login_post_admin);

//personal client login
router.post('/loginPersonal', authController.login_post_personal);

//organization login
router.post('/loginOrg', authController.login_post_org);

//station login
router.post('/loginStation', authController.login_post_station);

//station get stand
router.post('/getStandStation', authController.getstand_post_station);

module.exports = router;