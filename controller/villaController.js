const model = require('../models/villaSchema');
const Villa = model.Villa;

exports.addVilla = (req, res) => {
    const villa = new Villa();
    villa.name = "Heramb villa"
    villa.price = 14000
    villa.bhk = 2
    villa.capacity = 10
    villa.baths = 2
    villa.save()
    res.status(201).json(req.body);
}

exports.villaInfo = async (req, res) => {
    const villas = await Villa.find();
    res.json(villas);
}