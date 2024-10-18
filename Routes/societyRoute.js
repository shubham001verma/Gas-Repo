// routes/societyRoutes.js
const express = require('express');
const router = express.Router();
const {
  createSociety,
  getAllSocieties,
  getSocietyById,
  updateSociety,
  deleteSociety,
  getTotalSocieties,
 
} = require('../Controller/societyController');

// Define the routes
router.post('/addsociety',createSociety);         // Create a new society
router.get('/getallsociety',getAllSocieties);        // Get all societies
router.get('/countsocieties',getTotalSocieties);
router.get('/getsinglesocity/:id',getSocietyById);      // Get a society by ID
router.put('/updatesocity/:id',updateSociety);       // Update a society by ID
router.delete('/deletesocity/:id',deleteSociety);     // Delete a society by ID

module.exports = router;


