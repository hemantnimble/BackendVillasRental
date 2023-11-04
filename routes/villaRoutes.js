const express = require('express');
const villaController = require('../controller/villaController');
const villaRouter = express.Router();

villaRouter
    .get('/', villaController.villaInfo)
    .post('/addvilla', villaController.addVilla)
    .put('/updatevilla/:id', villaController.updateVilla)
    .delete('/deletevilla/:id', villaController.deleteVilla)

exports.router = villaRouter;


