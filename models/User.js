// models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255]
    }
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  profilePicture: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  stars: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      max: 5
    }
  },
  bio: {
    type: DataTypes.STRING,
  },
  smokingPreference: {
    type: DataTypes.ENUM("No preference", "Smoke-free only", "Okay with smoking"),
  },
  musicPreference: {
    type: DataTypes.ENUM("No preference", "Quiet ride", "Music welcome"),
  },
  petFriendly: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true
});

export default User;
