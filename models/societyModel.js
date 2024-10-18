const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contectperson: { type: String, },
  contectpersonNo:{ type:String,}
}, { timestamps: true });

module.exports = mongoose.model('Society', societySchema); 
