const express = require('express');
const apartmentController = require('../Controller/apparmentController');
const router = express.Router();

// Get all apartments
router.get('/allappartment', apartmentController.getAllApartments);

// Get apartments by block
router.get('/appartmentbyblock/:blockId', apartmentController.getApartmentsByBlock);

// Get a single apartment by ID
router.get('/singleappartment/:id', apartmentController.getApartmentById);

// Create a new apartment
router.post('/createAppartment', apartmentController.createApartment);

// Update an apartment
router.put('/updateAppartment/:id', apartmentController.updateApartment);

// Delete an apartment
router.delete('/deleteAppartment/:id', apartmentController.deleteApartment);

module.exports = router;

