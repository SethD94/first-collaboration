const UserController = require('../controllers/User.js');
const express = require('express');
const router = express.Router();


router.post('/user/signup' , UserController.signUpNewUser);
router.get('/user/list' , UserController.getUserList);
router.post('/user/login' , UserController.loginUser);
router.get('/user/:id' , UserController.getUserById);

module.exports = router;