const mongoose = require('mongoose');
const { Schema } = mongoose;


const villaSchema = new Schema({
    name: String,
    bhk: String,
    capacity: String,
    price: String,
    driveLink: String,
    halls: Number,
    images: [String],
    amenities: {
        wifi: Boolean,
        tv: Boolean,
      },});

exports.Villa = mongoose.model('Villa', villaSchema);  