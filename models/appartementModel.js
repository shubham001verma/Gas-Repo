const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  block: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Block',
  
  },
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
   
  },
});

module.exports = mongoose.model('Apartment', apartmentSchema);
