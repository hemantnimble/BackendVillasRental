const model = require('../models/villaSchema');
const Villa = model.Villa;

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

        // Create an object to hold the amenities dynamically
        const amenities = {};
        for (const key in req.body) {
            if (key.startsWith('amenities.')) {
                const amenityName = key.substring('amenities.'.length);
                amenities[amenityName] = req.body[key] === 'true';
            }
        }

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

        const formData = req.body; // Data from the request
        const id = req.params.id; // Document ID

        // Check if new images were uploaded
        const newImages = req.files;

        if (newImages) {
            // Extract file paths from req.files and update formData.images
            formData.images = newImages.map(file => file.path);
        }

        const updatedVilla = await Villa.findByIdAndUpdate(id, formData, { new: true });

        res.json(updatedVilla);
    } catch (err) {
        console.error(err);
        res.status(500).send('Update failed');
    }
};

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