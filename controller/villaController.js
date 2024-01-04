const model = require('../models/villaSchema');
const Villa = model.Villa;
// const multer = require('multer');

// GET ALL VILLAS INFO
exports.villaInfo = async (req, res) => {
    const villas = await Villa.find();
    res.json(villas);
}
//GET SINGLE VILLA INFO
exports.singleVilla = async (req, res) => {
    const id = req.params.id
    const singleVilla = await Villa.findById(id);
    res.json(singleVilla);
    // console.log(id)
}
// ADD A NEW VILLA
exports.addVilla = async (req, res) => {

    try {
        const { name, bhk, capacity, checkin, checkout, drivelink, halls, baths, weekendprice, weekdayprice, aboveguests, description, location, mapslink } = req.body;
        const images = req.files.map(file => file.path);
        const amenities = {
            wifi: req.body['amenities.wifi'] === 'true', // convert checkbox value to boolean
            tv: req.body['amenities.tv'] === 'true',
        };


        const villa = new Villa({
            images, amenities, name, bhk, capacity, checkin, checkout, drivelink, halls, baths, weekendprice, weekdayprice, aboveguests, description, location, mapslink
        });
        await villa.save();

        res.status(201).json({ message: 'Villa added successfully' });
    } catch (error) {
        console.error('Error adding villa:', error);
        res.status(500).json({ error: 'Failed to add villa' });
    }
};

// UPDATE EXISTING VILLA
exports.updateVilla = async (req, res) => {
    try {
        const updatedVilla = req.body; // Data from the request
        const id = req.params.id; // Document ID

        await Villa.findByIdAndUpdate(id, updatedVilla, { new: true });
        res.json(updatedVilla);
    } catch (err) {
        console.error(err);
        res.status(500).send('Update failed');
    }
}
// DELETE EXISTING VILLA
exports.deleteVilla = async (req, res) => {
    const id = req.params.id;
    await Villa.findByIdAndDelete(id);
    res.json({ message: "deleted" })
}

// const imagesMiddleware = multer({ dest: 'uploadedImages/' })
// //HANDLE FILES/IMAGES UPOLADS
// exports.uploadImages = (imagesMiddleware.array('images', 10), async (req, res) => {
//     // const uploadedFiles = [];
//     // for (let i = 0; i < req.files.length; i++) {
//     //     const { path, originalname, mimetype } = req.files[i];
//     //     const url = await uploadToS3(path, originalname, mimetype);
//     //     uploadedFiles.push(url);
//     // }
//     // res.json(uploadedFiles);
//     res.json(req.files)
// })