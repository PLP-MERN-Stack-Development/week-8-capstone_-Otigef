const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('📴 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 To fix this:');
    console.log('1. Check your MONGO_URI in .env file');
    console.log('2. Go to MongoDB Atlas → Network Access → Add IP Address');
    console.log('3. Add your current IP or 0.0.0.0/0 for all IPs');
    console.log('4. Or use a local MongoDB instance');
    process.exit(1);
  }
};

module.exports = connectDB;
