const mongoose = require('mongoose');
const { Schema } = mongoose;


const villaSchema = new Schema({
  name: String,
  bhk: Number,
  capacity: String,
  drivelink: String,
  halls: Number,
  checkin: Number,
  checkout: Number,
  baths: Number,
  weekendprice: Number,
  weekdayprice: Number,
  aboveguests: Number,
  description: String,
  location: String,
  mapslink: String,
  images: [String],
  amenities: {
    type: Map,
    of: Boolean,
  },
});

exports.Villa = mongoose.model('Villa', villaSchema);  