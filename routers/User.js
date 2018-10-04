const UserController = require('../controllers/User.js');
const express = require('express');
const router = express.Router();


router.post('/user/signup' , UserController.addUser);
router.get('/user/list' , UserController.getUserList);
router.post('/user/login' , UserController.loginUser);


module.exports = router;