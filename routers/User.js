const UserController = require('../controllers/User.js');
require('../config/passportSetup');
const passport = require('passport');
const express = require('express');
const router = express.Router();


router.post('/user/signup', passport.authenticate('local', { failureRedirect: '/error' }), UserController.signInUser);
router.get('/user/list' , UserController.getUserList);
router.post('/user/login' , UserController.loginUser);
router.get('/user/:id' , UserController.getUserById);
router.get('/error', UserController.signInError);

module.exports = router;