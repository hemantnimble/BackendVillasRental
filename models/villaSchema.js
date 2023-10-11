const mongoose = require('mongoose');
const { Schema } = mongoose;


const villaSchema = new Schema({
    name: String,
    driveLink: String,
    price: Number,
    bhk: Number,
    baths: Number,
    capacity: String,
    images: [String]
});

exports.Villa = mongoose.model('Villa', villaSchema);  