const mongoose = require('mongoose');

const companySettingsSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  gstNo: {
    type: String, // GST Number of the company
    
  },
  mobileNo: {
    type: String, // Mobile number of the company
   
  },
  email: {
    type: String,
   
  },
  address: {
    type: String,
 
  },
  city: {
    type: String, // City of the company
    
  },
  commonUnit: {
    type: String, // Example: 'cubic meter' or 'liter', etc.
   
  },
  ratePerKg: {
    type: String, // Price per kg of gas
   
  },
  adminAmount: {
    type: String, // Additional admin fees
   
  }
}, { timestamps: true });

module.exports = mongoose.model('CompanySettings', companySettingsSchema);

