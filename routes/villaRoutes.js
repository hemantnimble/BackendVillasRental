const express = require('express');
const villaController = require('../controller/villaController');
const villaRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

villaRouter
    .get('/', villaController.villaInfo)
    .post('/addvilla',upload.array('images', 12), villaController.addVilla)
    .put('/updatevilla/:id', villaController.updateVilla)
    .delete('/deletevilla/:id', villaController.deleteVilla)

exports.router = villaRouter;


