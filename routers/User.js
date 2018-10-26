const UserController = require('../controllers/User.js');
require('../config/passportSetup');
const passport = require('passport');
const express = require('express');
const router = express.Router();


router.post('/user/signup',
passport.authenticate('local', { failureRedirect: '/error' }),
function(req, res) {
    res.send('sucessful login');
});
router.get('/user/list' , UserController.getUserList);
router.post('/user/login' , UserController.loginUser);
router.get('/user/:id' , UserController.getUserById);
router.get('/home',
  function(req, res) {
    res.render('home');
  });
  router.get('/error',
  function(req, res) {
    res.send('error');
  });

module.exports = router;