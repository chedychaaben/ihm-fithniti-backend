import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  isDriver: {
    type: Boolean,
    default: false,
  },
  driverLicense: {
    type: String,
  },
  profilePicture: {
    type: String,
    trim: true
  },
  cinPicture: {
    type: String,
    trim: true
  },
  permisPicture: {
    type: String,
    trim: true
  },

  ridesCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ride',
    },
  ],
  ridesJoined: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ride',
    },
  ],

  profile: {
    bio: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    age: {
      type: String,
      trim: true,
      min: "0"
    },
    preferences: {
      smoking: {
        type: String,
        enum: ['No preference', 'Smoke-free only', 'Okay with smoking'],
      },
      music: {
        type: String,
        enum: ['No preference', 'Quiet ride', 'Music welcome'],
      },
      petFriendly: {
        type: Boolean,
        default: false,
      },
    },
  },
  stars: {
    type: Number,
    max: 5,
    default: 0
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating',
    },
  ],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
