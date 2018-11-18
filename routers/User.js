const UserController = require('../controllers/User.js');
require('../config/passportSetup');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');



router.post('/user/signup', passport.authenticate('local-signup', { failureRedirect: '/error' }), (req, res) => {
  const { user } = req;
  const token = jwt.sign(String(user._id), 'thisisasecret!@#$@KASD');
  return res.send(token);
});
router.get('/user/list' , UserController.getUserList);
router.post('/user/login' , UserController.loginUser);
router.get('/user/:id' , UserController.getUserById);
router.get('/error', UserController.signInError);

module.exports = router;