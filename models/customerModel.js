const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  block: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Block',
  },
  apartmentNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment',
  },
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
  },
  previousBillNo: {
    type: String,
  },
  previousBalance: {
    type: String,
  },
  previousReading: {
    type: Number,
    default: 0,
  },
  currentReading: {
    type: Number,
    default: 0,
  },
  unitsConsumed: {
    type: Number,
    default: 0,
  },
  ratePerKg: {
    type: Number,
  
    default: 20, // Default rate per kg (can be adjusted based on company settings).
  },
  totalAmount: {
    type: Number,
    default: 0, // Store the calculated amount for gas consumption.
  },
  previousDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
