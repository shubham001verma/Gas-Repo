// controllers/societyController.js
const Society = require('../models/societyModel');

// Create a new society
exports.createSociety = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if a society with the same name already exists
    const existingSociety = await Society.findOne({ name });

    if (existingSociety) {
      return res.status(400).json({ message: 'Society with this name already exists' });
    }

    // Proceed to create the society if the name is not taken
    const society = new Society(req.body);
    await society.save();
    res.status(201).json(society);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all societies
exports.getAllSocieties = async (req, res) => {
  try {
    const societies = await Society.find();
    res.status(200).json(societies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getTotalSocieties = async (req, res) => {
  try {
    const totalSocieties = await Society.countDocuments();
    res.json({ totalSocieties });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching total societies' });
  }
};

// Get a society by ID
exports.getSocietyById = async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }
    res.status(200).json(society);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a society by ID
exports.updateSociety = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    // Check if a different society with the same name already exists
    const existingSociety = await Society.findOne({ name, _id: { $ne: id } });

    if (existingSociety) {
      return res.status(400).json({ message: 'Society with this name already exists' });
    }

    // Proceed to update the society
    const society = await Society.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }

    res.status(200).json(society);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a society by ID
exports.deleteSociety = async (req, res) => {
  const { id } = req.params;
  try {
    const society = await Society.findByIdAndDelete(id);
    if (!society) {
      return res.status(404).json({ message: 'Society not found' });
    }
    res.json({ message: 'Society deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting society', error: err.message });
  }
};
