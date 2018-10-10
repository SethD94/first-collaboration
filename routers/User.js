const UserController = require('../controllers/User.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Strategy = require('passport-local').Strategy;


router.post('/user/signup' , UserController.addUser);
router.get('/user/list' , UserController.getUserList);
router.post('/user/login' , passport.authenticate('local', { successRedirect: '/', failureRedirect: 'user/login'}));
router.get('/user/:id' , UserController.getUserById);

module.exports = router;

