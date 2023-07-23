import mongoose from 'mongoose';
import dotenv from 'dotenv';
export default class dbConnect {
  constructor() {
    dotenv.config();
  }

  initializeConnection() {
    const url: string = process.env['MONGO_URI'] ?? '';
    mongoose.connect(url, {}).then(() => {});
  }
}

