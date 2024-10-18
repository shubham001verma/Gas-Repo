const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Import Routes

const userRoutes = require('./Routes/userRoute');
const societyRoutes = require('./Routes/societyRoute');
const customerRoutes = require('./Routes/customerRoute');
const BlockRoutes = require('./Routes/blockRoute');
const companySettingsRoutes = require('./Routes/compenyRoute');
const appartmentRoutes = require('./Routes/apparmentRoute');
const BillRoutes = require('./Routes/billRoute');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(morgan('dev'));  // Log HTTP requests
app.use(express.json());  // Parse JSON request bodies
app.use('/uploads', express.static('uploads'));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,
)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

// Routes

app.use('/users', userRoutes);  // Gas Meter Reader Employee routes
app.use('/societies', societyRoutes);  // Society routes
app.use('/customers', customerRoutes);  // Customer routes
app.use('/blocks', BlockRoutes); // Block routes
app.use('/company-settings', companySettingsRoutes); 
  app.use('/appartments', appartmentRoutes); // Appartment routes
  app.use('/bills', BillRoutes); // Bill routes
// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
