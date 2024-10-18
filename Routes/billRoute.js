const express = require('express');
const { createBill, getCustomerBills, getAllBills } = require('../Controller/billController');

const router = express.Router();

// Route to create a new bill
router.post('/createbills', createBill);

// Route to get all bills for a specific customer
router.get('/singebills/:customerId', getCustomerBills);

// Route to get all bills (optional)
router.get('/allbills', getAllBills);

module.exports = router;
