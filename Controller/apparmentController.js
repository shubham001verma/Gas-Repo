const Apartment = require('../models/appartementModel');

// Fetch all apartments (optional: with pagination or filters)
exports.getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().populate('society').populate('block');;
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apartments', error });
  }
};

exports.getApartmentsByBlock = async (req, res) => {
  try {
    const apartments = await Apartment.find({ block: req.params.blockId });
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a single apartment by ID
exports.getApartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const apartment = await Apartment.findById(id).populate('block');
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apartment', error });
  }
};

// Create a new apartment
exports.createApartment = async (req, res) => {
  const { name, block,society } = req.body;
  console.log(name, block, society);

  
  try {
    // Check if an apartment with the same name already exists
    const existingApartment = await Apartment.findOne({ name,block,society });
    
    if (existingApartment) {
      return res.status(400).json({ message: 'This name apartment is already registered' });
    }
    
    // If not, create the new apartment
    const apartment = new Apartment({ name, block,society });
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating apartment', error });
  }
};


// Update an apartment
exports.updateApartment = async (req, res) => {
  const { id } = req.params;
  const { name, block,society } = req.body;
  
  try {
    const apartment = await Apartment.findById(id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    // Check if an apartment with the same name already exists (excluding the current one)
    const existingApartment = await Apartment.findOne({ name,block,society, _id: { $ne: id } });
    
    if (existingApartment) {
      return res.status(400).json({ message: 'This name apartment is already registered' });
    }

    // Update apartment fields
    apartment.name = name || apartment.name;
    apartment.block = block || apartment.block;
    apartment.society = society || apartment.society;

    await apartment.save();
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating apartment', error });
  }
};


exports.deleteApartment = async (req, res) => {
  try {
    const appartmentId = req.params.id;
    const deletedAppartment = await Apartment.findByIdAndDelete(appartmentId);
    
    if (!deletedAppartment) {
      return res.status(404).json({ message: 'Appartment not found' });
    }

    res.status(200).json({ message: 'Appartment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appartment:', err);
    res.status(500).json({ message: 'Server error. Could not delete appartment.' });
  }
};

