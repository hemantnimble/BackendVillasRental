const model = require('../models/villaSchema');
const Villa = model.Villa;

exports.villaInfo = async (req, res) => {
    const villas = await Villa.find();
    res.json(villas);
}

exports.addVilla = async (req, res) => {
    try {
        const villaData = req.body;
        const villa = new Villa(villaData);
        await villa.save();
        res.status(201).json({ message: 'Villa added successfully' });
    } catch (error) {
        console.error('Error adding villa:', error);
        res.status(500).json({ error: 'Failed to add villa' });
    }
}
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
exports.deleteVilla = async (req, res) => {
    const id = req.params.id;
    await Villa.findByIdAndDelete(id);
    res.json({ message: "deleted" })
}
