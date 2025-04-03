import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255],
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isNumeric: true,
    },
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: true,
      min: 1,
    },
  },
  profile: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

// Associations (if you have Ride model)
User.associate = (models) => {
  User.hasMany(models.Ride, { foreignKey: "createdBy", as: "ridesCreated" });
  User.belongsToMany(models.Ride, { through: "UserRides", as: "ridesJoined" });
};

export default User;
