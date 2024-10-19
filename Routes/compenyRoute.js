const express = require('express');
const {
  createCompanySettings,
  getCompanySettings,
  deleteCompanySettings,
  getCompanySettingsById ,
  updateCompanySettings, // Add this to handle explicit update route
  getTotalCompanies // Add this to get total number of companies
} = require('../Controller/compenyController');


const router = express.Router();

// Create or Update Company Settings
router.post('/addcompeny', createCompanySettings);
router.get('/countcompeny', getTotalCompanies);

// Get Company Settings
router.get('/getallcompeny', getCompanySettings);
// Get Company Settings by ID
router.get('/getsinglecompeny/:id', getCompanySettingsById);

// Update Company Settings (explicit update route)
router.put('/updatecompeny/:id', updateCompanySettings);  // PUT method for updating

// Delete Company Settings
router.delete('/deletecompeny/:id', deleteCompanySettings);

module.exports = router;
