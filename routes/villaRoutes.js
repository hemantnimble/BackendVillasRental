const express = require('express');
const villaController = require('../controller/villaController');
const villaRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

villaRouter
    .get('/', villaController.villaInfo)
    .get('/:id', villaController.singleVilla)
    .post('/addvilla',upload.array('images', 12), villaController.addVilla)
    .put('/updatevilla/:id', upload.array('images', 12),  villaController.updateVilla)
    .delete('/deletevilla/:id', villaController.deleteVilla)

exports.router = villaRouter;


