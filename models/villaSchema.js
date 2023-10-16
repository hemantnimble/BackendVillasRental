const mongoose = require('mongoose');
const { Schema } = mongoose;


const villaSchema = new Schema({
    name: String,
    bhk: String,
    capacity: String,
    price: String,
    driveLink: String,
    // baths: String,
    // images: [String]
});

exports.Villa = mongoose.model('Villa', villaSchema);  