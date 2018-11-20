const UserController = require('../controllers/User.js');
require('../config/passportSetup');
const passport = require('passport');
const express = require('express');
const router = express.Router();


router.post('/user/signup', passport.authenticate('local.signup', { failureRedirect: '/error' }), (req, res) => {
  res.send("hello");

});
router.get('/user/list' , UserController.getUserList);
router.post('/user/login' , passport.authenticate('local.login', {session: false}, { failureRedirect: '/error' }), (req, res) => {
  res.send("hello user");
});
router.get('/user/:id' , UserController.getUserById);
router.get('/error', UserController.signInError);

module.exports = router;