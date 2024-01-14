const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Account Exist With This E-mail"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        unique: false
    },

});

exports.User = mongoose.model('User', userSchema);  