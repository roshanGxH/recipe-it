const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.warn("WARNING: MONGO_URI environment variable is not defined! Falling back to localhost.");
    } else {
      const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
      console.log(`Attempting to connect to MongoDB using URI: ${maskedUri}`);
    }
    const conn = await mongoose.connect(uri || 'mongodb://localhost:27017/recipeit');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
