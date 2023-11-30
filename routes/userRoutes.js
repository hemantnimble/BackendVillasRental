const express = require('express');
const userController = require('../controller/userController');
const userRouter = express.Router();

userRouter
    // .get('/', userController.userInfo)
    // .get('/getuser/:id', userController.getUser)
    // .post('/adduser', userController.addUser)
    .post('/login', userController.login)

exports.router = userRouter;


