import mongoose from 'mongoose';
import { env } from '../utils/env.js';

async function initMongoConnection() {
  try {
    const user = env('MONGODB_USER', '4qc7');
    const password = env('MONGODB_PASSWORD', 'ZKLtoO7SXCW3Mu5s');
    const url = env('MONGODB_URL', 'cluster0.yhldf.mongodb.net');
    const db = env('MONGODB_DB', 'contacts');

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Mongo connection successfully established!');

    console.log('Database connection successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMongoConnection };
