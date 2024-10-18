const express = require('express');
const router = express.Router();
const authController = require('../Controller/userController');
const upload = require('../middleware/Multer')

// Register User (Admin/Employee)
router.post('/register', upload.single("uploadImage"), authController.registerUser);

// Login User (Admin/Employee)
router.post('/login', authController.loginUser);

router.get('/countuser',authController.getTotalUsers);
router.get('/allusers', authController.getAllUsers);

// Get Single User by ID
router.get('/singleuser/:id', authController.getUserById);

// Update User
router.put('/updateuser/:id',  upload.single("uploadImage"),authController.updateUser);

// Delete User
router.delete('/deleteuser/:id', authController.deleteUser);
router.post('/logout',authController.logoutUser);

module.exports = router;


