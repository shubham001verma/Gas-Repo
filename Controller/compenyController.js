const CompanySettings = require('../models/compenyModel'); // Ensure this path is correct

// Create or Update Company Settings
exports.createCompanySettings = async (req, res) => {
  try {
    const { name, gstNo, mobileNo, email, address, city, commonUnit, ratePerKg, adminAmount } = req.body;

    // Check if a company with the same GST No or name already exists
    const existingCompany = await CompanySettings.findOne({ gstNo });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company settings with this GST number already exist' });
    }

    // Create new company settings
    const newCompanySettings = new CompanySettings({
      name,
      gstNo,
      mobileNo,
      email,
      address,
      city,
      commonUnit,
      ratePerKg,
      adminAmount,
    });

    // Save to the database
    await newCompanySettings.save();
    
    res.status(201).json({ message: 'Company settings created successfully', companySettings: newCompanySettings });
  } catch (error) {
    res.status(500).json({ message: 'Error creating company settings', error });
  }
};


exports.getTotalCompanies = async (req, res) => {
  try {
    const totalCompanies = await CompanySettings.countDocuments();
    res.json({ totalCompanies });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching total companies' });
  }
};


// Get Company Settings
exports.getCompanySettings = async (req, res) => {
  try {
    const companySettings = await CompanySettings.find();
    if (!companySettings) return res.status(404).json({ message: 'Company settings not found' });

    res.status(200).json(companySettings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company settings', error });
  }
};

// Update Company Settings by ID
exports.updateCompanySettings = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the route params
    const { name, gstNo, mobileNo, email, address, city, commonUnit, ratePerKg, adminAmount } = req.body;

    const updatedSettings = await CompanySettings.findByIdAndUpdate(
      id,
      { name, gstNo, mobileNo, email, address, city, commonUnit, ratePerKg, adminAmount, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({ message: 'Company settings not found' });
    }

    res.status(200).json({ message: 'Company settings updated successfully', updatedSettings });
  } catch (error) {
    res.status(500).json({ message: 'Error updating company settings', error });
  }
};

// Delete Company Settings
exports.deleteCompanySettings = async (req, res) => {
  try {
    const companySettings = await CompanySettings.findOneAndDelete();
    if (!companySettings) return res.status(404).json({ message: 'Company settings not found' });

    res.status(200).json({ message: 'Company settings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company settings', error });
  }
};

// Get Company Settings by ID (if needed)
exports.getCompanySettingsById = async (req, res) => {
  try {
    const { id } = req.params;
    const companySettings = await CompanySettings.findById(id);

    if (!companySettings) {
      return res.status(404).json({ message: 'Company settings not found' });
    }

    res.status(200).json(companySettings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company settings', error });
  }
};
