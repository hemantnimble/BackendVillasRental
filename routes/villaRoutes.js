const express = require('express');
const villaController = require('../controller/villaController');
const villaRouter = express.Router();

villaRouter
    .get('/villas', villaController.villaInfo)
    .post('/add', villaController.addVilla)
    .post('/add', villaController.addVilla)
    .post('/add', villaController.addVilla)
    .post('/add', villaController.addVilla)
    .post('/add', villaController.addVilla);


exports.router = villaRouter;


