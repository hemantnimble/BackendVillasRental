const mongoose = require('mongoose');
const { Schema } = mongoose;


const villaSchema = new Schema({
    name: String,
    bhk: String,
    capacity: String,
    price: String,
    driveLink: String,
    images: [{ data: Buffer, contentType: String }]
});

exports.Villa = mongoose.model('Villa', villaSchema);  