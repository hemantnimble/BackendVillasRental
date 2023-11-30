const model = require('../models/userSchema');
const User = model.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


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
            // username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "48h" });

        const expiryDate = new Date(Date.now() + 3600000)
        const { password: hashedPassword, ...rest } = user._doc;
        res.cookie('token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest);




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
