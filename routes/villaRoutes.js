const express = require('express');
const villaController = require('../controller/villaController');
const villaRouter = express.Router();
const formidable = require('express-formidable')

villaRouter
    .get('/villas', villaController.villaInfo)
    .post('/addvilla', villaController.addVilla)
    .put('/updatevilla/:id', villaController.updateVilla)
    .delete('/villas/:id', villaController.deleteVilla)

exports.router = villaRouter;


