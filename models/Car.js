// models/Car.js
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Car', carSchema);
