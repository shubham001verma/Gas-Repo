const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId,
    
   },
  billNo: { type: String, },
  totalAmount: { type: Number, },
  createdAt: { type: Date, default: Date.now },
  currentReading: { type: Number }, // Required field
  previousReading: { type: Number,}, // Required field
});

const Bill = mongoose.model('Bill', billSchema);
 module.exports = Bill;

