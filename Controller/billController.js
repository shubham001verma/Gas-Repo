const Bill = require('../models/billModel');

const createBill = async (req, res) => {

    try {
      const { customerId, billNo, totalAmount, createdAt, currentReading, previousReading } = req.body;
  
      const newBill = new Bill({
        customerId,
        billNo,
        totalAmount,
        createdAt,
        currentReading,
        previousReading,
      });
  
      await newBill.save();
      res.status(201).json(newBill);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
 
  
};


// Get all bills for a specific customer
const getCustomerBills = async (req, res) => {
  try {
    const { customerId } = req.params;
    const bills = await Bill.find({ customer: customerId }).populate('customer', 'name mobile'); // Populate customer details

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bills', error });
  }
};

// Get all bills (optional: if you want to retrieve all bills)
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find()

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bills', error });
  }
};

module.exports = {
  createBill,
  getCustomerBills,
  getAllBills,
};
