const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String,},
  mobile: { type: String,},
  email: { type: String, },
  password: { type: String,},
  address: { type: String },
  dateofbirth:{ type: String},
  role: { type: String, enum: ['Admin', 'GasReder'], default: 'GasReder' }, // Role field
  createdAt: {
    type: Date,
    default: Date.now
  },
  uploadImage: {
    type: String,
},

});

// Hashing the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

