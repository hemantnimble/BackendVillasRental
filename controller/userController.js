const model = require('../models/userSchema');
const User = model.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// GET ALL USRES INFORMATION 
exports.userInfo = async (req, res) => {
    const users = await User.find();
    res.json(users);
}
// REGISTER A NEW USER 
exports.addUser = async (req, res) => {
    try {
        const { username, email, password, phonenum, city } = req.body;

        // Check if user or phone number already exists
        const existingUser = await User.findOne({ email });
        const existPhoneNum = await User.findOne({ phonenum });

        if (existingUser) {
            return res.status(400).json({ error: "Email Exists" });
        }

        if (existPhoneNum) {
            return res.status(400).json({ error: "Phone Number Exists" });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                username,
                email,
                password: hashedPassword,
                phonenum,
                city
            });

            const result = await user.save();
            if (result) {
                return res.status(201).send({ msg: "Registered successfully" });
            }
        }

        // Handle password hashing failure
        return res.status(500).send({ error: "Unable to hash password" });

    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: "Server error" });
    }
};

// LOGIN USER 
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: "User Not Found" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(400).send({ error: "Password does not match" });
        }

        // Generate JWT token
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "48h" });

        return res.status(200).send({
            msg: "Login Success",
            username: user.username,
            token
        });
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
};

//  GET SINGLE USER USING ID 
exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.send(user);
    } catch (err) {
        return res.status(500).send("Error retrieving user");
    }
};






























// exports.updateVilla = async (req, res) => {
//     try {
//         const updatedVilla = req.body; // Data from the request
//         const id = req.params.id; // Document ID

//         await Villa.findByIdAndUpdate(id, updatedVilla, { new: true });
//         res.json(updatedVilla);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Update failed');
//     }
// }
// exports.deleteVilla = async (req, res) => {
//     const id = req.params.id;
//     await Villa.findByIdAndDelete(id);
//     res.json({ message: "deleted" })
// }
