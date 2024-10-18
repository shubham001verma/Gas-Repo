const Customer = require('../models/customerModel');

// Register Customer (Create)
exports.registerCustomer = async (req, res) => {
  try {
    const { name, mobile, block, apartmentNo, society, previousBillNo,
      previousBalance,
      previousReading,
      previousDate } = req.body;

    // Check for existing customers in the same block and apartment
    const existingCustomer = await Customer.findOne({ block, apartmentNo });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Alert: This apartment is already filled.' });
    }

    const customer = new Customer({ name, mobile, block, apartmentNo, society, previousBillNo,
      previousBalance,
      previousReading,
      previousDate });
    await customer.save();
    res.status(201).json({ message: 'Customer registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering customer', error });
  }
};


exports.customerbilldata =async(req,res)=>{
 
    const { society, block, apartment } = req.query;

    try {
        const customers = await Customer.find({
            society,
            block,
            apartmentNo: apartment
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error });
    }

}
exports.getCustomerByApartment = async (req, res) => {
  try {
    const customer = await Customer.findOne({ apartmentNo: req.params.apartmentId });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalCustomers = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    res.json({ totalCustomers });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching total customers' });
  }
};

// Get All Customers (Read)
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};

// Get Single Customer by ID (Read)
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id) .populate('block') // Assuming block is referenced in your customer schema
    .populate('apartmentNo') // Assuming apartment is referenced in your customer schema
    .populate('society'); // Assuming society is referenced in your customer schema;
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error });
  }
};

// Update Customer (Update)
exports.updateCustomer = async (req, res) => {
  try {
    const { name, mobile, block, apartmentNo, society, previousBillNo,
      previousBalance,
      previousReading,
      previousDate } = req.body;

    // Check for existing customers in the same block and apartment, excluding the current customer
    const existingCustomer = await Customer.findOne({ block, apartmentNo, _id: { $ne: req.params.id } });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Alert: This apartment is already filled by another customer.' });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, mobile, block, apartmentNo, society, previousBillNo,
        previousBalance,
        previousReading,
        previousDate },
      { new: true }
    );
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    res.status(200).json({ message: 'Customer updated successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error });
  }
};
exports.updateCustomerbill = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.customerId, req.body, { new: true });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete Customer (Delete)
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error });
  }
};

