const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please Enter Your Name"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Account Exist With This E-mail"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        unique:false
    },
    phonenum: {
        type: Number,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Account Exist With This Phone Number"],
    },
    city: String,
});

exports.User = mongoose.model('User', userSchema);  