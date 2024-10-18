const User = require('../models/userModel');
const jwt = require('jsonwebtoken');




// Register Employee or Admin
exports.registerUser = async (req, res) => {
  try {
    const { name, mobile, email, password, address, role,dateofbirth } = req.body;
    const uploadImage=  req.file ? req.file.path : null
    const user = new User({ name, mobile, email, password, address, role,uploadImage ,dateofbirth});
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Employee/Admin Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return token and role
    res.status(200).json({ token, role: user.role , id: user.id});
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching total customers' });
  }
};
// Get User By ID
exports.getUserById = async (req, res) => {
  const {id} = req.params;
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update Use// Update User (admin or employee)
exports.updateUser = async (req, res) => {
  try {
    const { name, mobile, email, address,dateofbirth } = req.body;

    // Fetch the existing user before updating
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) return res.status(404).json({ message: 'User not found' });

    // Check for file upload and assign image path, otherwise keep the existing image
    const uploadImage = req.file ? req.file.path : existingUser.uploadImage;

    // Update the user with new values
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, mobile, email, address, uploadImage,dateofbirth }, { new: true });
    
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Logout User
exports.logoutUser = async (req, res) => {
  try {
    // On the client side, you would remove the token from localStorage or AsyncStorage.
    // On the server side, simply return a successful response indicating logout.
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};
