import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  availableSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  origin: {
    place: {
      type: String, 
      required: true,
    },
    coordinates: {
      type: [Number],
    }, 
  },
  destination: {
    place: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'canceled'],
    default: 'pending',
  },
  price: {
    type: Number, 
  },
  vehicleDetails: {
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
    }
  },
  maxTwoPassengersInBackSeats: {
    type: Boolean,
    default: false,
  },
  smokingAllowed: {
    type: Boolean,
    default: false,
  },
  heavyLuggage: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  airConditioning: {
    type: Boolean,
    default: true,
  },
  chat: [ 
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      message: String,
      timestamp: Date,
    },
  ],
}, {timestamps:true}
);

export default mongoose.model('Ride', rideSchema);