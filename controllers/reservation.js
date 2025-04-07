import Reservation from "../models/Reservation.js";
import Ride from "../models/Ride.js";

export const bookRide = async (req, res, next) => {
  try {
    const { rideId } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride || ride.availableSeats < 1) {
      return res.status(400).json({ message: "Ride not available" });
    }

    const reservation = new Reservation({
      rideId,
      passengerId: req.user.id
    });

    await reservation.save();

    ride.passengers.push(req.user.id);
    ride.availableSeats--;
    await ride.save();

    res.status(201).json({ message: "Ride reserved", reservation });
  } catch (err) {
    next(err);
  }
};

export const cancelReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);
    if (!reservation || reservation.passengerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Reservation.findByIdAndDelete(id);

    await Ride.findByIdAndUpdate(reservation.rideId, {
      $inc: { availableSeats: 1 },
      $pull: { passengers: reservation.passengerId }
    });

    res.status(200).json({ message: "Reservation cancelled" });
  } catch (err) {
    next(err);
  }
};

export const confirmReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Reservation.findByIdAndUpdate(id, { confirmed: true }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
