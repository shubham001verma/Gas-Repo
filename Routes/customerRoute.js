// routes/customerRoutes.js
const express = require('express');
const {
  registerCustomer,
  getAllCustomers,
  getCustomersByBlock,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getTotalCustomers, 
  customerbilldata ,
  getCustomerByApartment,
  updateCustomerbill

} = require('../Controller/customerController');

const router = express.Router();

// Register Customer
router.post('/customerregister', registerCustomer);

router.get('/countcustomer',getTotalCustomers);
// Get All Customers
router.get('/customerall', getAllCustomers);

router.get('/customerbyappartment/:apartmentId',getCustomerByApartment)
///for billing
router.get('/getcustomerdata',customerbilldata )

// Get Single Customer by ID
router.get('/customersingle/:id', getCustomerById);

// Update Customer
router.put('/customerupdate/:id', updateCustomer);
router.put('/updatecustomerbill/:customerId', updateCustomerbill)
// Delete Customer
router.delete('/customerdelete/:id', deleteCustomer);

module.exports = router;

