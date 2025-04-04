import Ride from "../models/Ride.js";
import User from "../models/User.js";
import { Op } from "sequelize";


// Get single ride
export const getRide = async (req, res, next) => {
  try {
    const ride = await Ride.findByPk(req.params.id, {
      include: [{ model: User, as: "creator", attributes: ["id", "name", "age", "profile", "createdAt"] }],
    });

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    res.status(200).json(ride);
  } catch (err) {
    next(err);
  }
};

// Get all rides
export const getAllRides = async (req, res, next) => {
  try {
    const rides = await Ride.findAll({
      include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
    });
    res.status(200).json(rides);
  } catch (err) {
    next(err);
  }
};

// Search for rides
export const findRides = async (req, res, next) => {
  try {
    const { from, to, seat, date } = req.query;

    if (!from || !to || !seat || !date) {
      return res.status(400).json({ message: "Please provide all the details" });
    }

    const searchDate = new Date(date);
    searchDate.setHours(0, 0, 0, 0);
    const nextMidnight = new Date(searchDate.getTime() + 24 * 60 * 60 * 1000);

    const rides = await Ride.findAll({
      where: {
        originPlace: { [Op.like]: `%${from}%` },
        destinationPlace: { [Op.like]: `%${to}%` },
        availableSeats: { [Op.gte]: parseInt(seat) },
        startTime: {
          [Op.between]: [searchDate, nextMidnight],
        },
      },
      include: [{ model: User, as: "creator", attributes: ["id", "name", "profilePicture"] }],
    });

    res.status(200).json({ success: true, rides });
  } catch (err) {
    next(err);
  }
};

// Join ride
export const joinRide = async (req, res, next) => {
  try {
    const ride = await Ride.findByPk(req.params.id, {
      include: [{ model: User, as: "passengers" }],
    });

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const alreadyJoined = ride.passengers.some(p => p.id === req.user.id);
    if (alreadyJoined) return res.status(400).json({ message: "You already joined this ride!" });

    if (ride.passengers.length >= ride.availableSeats) {
      return res.status(400).json({ message: "Ride is full!" });
    }

    // Add user to ride's passengers
    await ride.addPassenger(req.user.id);
    await ride.update({ availableSeats: ride.availableSeats - 1 });

    res.status(200).json({ message: "Successfully joined the ride!" });
  } catch (err) {
    next(err);
  }
};

// Create ride
export const createRide = async (req, res, next) => {
  try {
    const newRide = await Ride.create({
      ...req.body,
      creatorId: req.user.id,
    });

    res.status(201).json(newRide);
  } catch (err) {
    next(err);
  }
};

// Update ride
export const updateRide = async (req, res, next) => {
  try {
    const ride = await Ride.findByPk(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    await ride.update(req.body);

    res.status(200).json({ success: true, ride });
  } catch (err) {
    next(err);
  }
};

// Delete ride
export const deleteRide = async (req, res, next) => {
  try {
    const ride = await Ride.findByPk(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    await ride.destroy();

    res.status(200).json({ message: "Ride has been deleted." });
  } catch (err) {
    next(err);
  }
};
