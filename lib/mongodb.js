import mongoose from 'mongoose';

// Use environment variable or fallback to local MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";

const MONGODB_OPTIONS = {
  bufferCommands: true, // Enable command buffering
  autoIndex: true, // Build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(retries = 3) {
  try {
    const mongoose = await connectDB();
    return mongoose;
  } catch (error) {
    if (retries > 0) {
      console.log(`MongoDB connection failed. Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
      return dbConnect(retries - 1);
    }
    throw error;
  }
}

export default async function connectDB() {
  if (cached.conn) {
    if (mongoose.connection.readyState === 1) {
      return cached.conn;
    }
    // If connection is not ready, clear the cache and try to reconnect
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, MONGODB_OPTIONS)
      .then((mongoose) => {
        console.log('Connected to MongoDB successfully');
        
        // Handle connection errors after initial connection
        mongoose.connection.on('error', (error) => {
          console.error('MongoDB connection error:', error);
          cached.conn = null;
          cached.promise = null;
        });

        mongoose.connection.on('disconnected', () => {
          console.warn('MongoDB disconnected. Attempting to reconnect...');
          cached.conn = null;
          cached.promise = null;
        });

        mongoose.connection.on('reconnected', () => {
          console.log('MongoDB reconnected successfully');
        });

        return mongoose;
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
} 