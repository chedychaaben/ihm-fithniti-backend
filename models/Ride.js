import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Ride = sequelize.define("Ride", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  originPlace: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originCoordinates: {
    type: DataTypes.JSON, // using JSON for coordinates
    allowNull: true,
  },
  destinationPlace: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinationCoordinates: {
    type: DataTypes.JSON, // using JSON for coordinates
    allowNull: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "active", "completed", "canceled"),
    defaultValue: "pending",
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,  // This can be null if not provided
  },
  vehicleNumber: {
    type: DataTypes.STRING,
    allowNull: true,  // This can be null if not provided
  },
  vehicleModel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,  // To automatically add `createdAt` and `updatedAt`
});

export default Ride;
