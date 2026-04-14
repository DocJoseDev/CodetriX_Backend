import mongoose from 'mongoose';
import dns from 'node:dns';

const connectDB = async () => {
  try {
    dns.setServers(['8.8.8.8']);
    console.log('DNS configurado a 8.8.8.8');

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
