const mongoose = require('mongoose');
const { Schema } = mongoose;


const villaSchema = new Schema({
    name: String,
    driveLink: String,
    price: String,
    bhk: String,
    baths: String,
    capacity: String,
    images: [String]
});

exports.Villa = mongoose.model('Villa', villaSchema);  