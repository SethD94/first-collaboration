const UserController = require('../controllers/User.js');
require('../config/passportSetup');
const keys = require('../config/keys');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/user/signup', passport.authenticate('local.signup', { failureRedirect: '/error' }), (req, res) => {
  const { user } = req.user;
  const token = jwt.sign({user}, keys.jwtKeyOne);
    res.json({user, token});
    return res.send(token);

});
router.get('/user/list' , UserController.getUserList);
router.post('/user/login' , passport.authenticate('local.login', { failureRedirect: '/error' }), (req, res) => {
  const { user } = req.user;
  const token = jwt.sign({user}, keys.jetKeyTwo);
    res.json({user, token});
    return res.send(token);
});
router.get('/user/:id' , UserController.getUserById);
router.get('/error', UserController.signInError);

module.exports = router;