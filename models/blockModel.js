const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  name: {
    type: String,
  
  },
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
   
  },
});

module.exports = mongoose.model('Block', blockSchema);
