import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Rating = sequelize.define("Rating", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  raterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ratedUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rideId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Rating;
