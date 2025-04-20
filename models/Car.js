// models/Car.js
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  marque: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  isSoftDeleted: {
    type: Boolean,
    default: false,
  },
  carPicture: {
    type: String,
    trim: true
  },
}, { timestamps: true });

export default mongoose.model('Car', carSchema);
