// controllers/car.js
import Car from "../models/Car.js";

// Ajouter une voiture
export const addCar = async (req, res, next) => {
  try {
    const newCar = new Car({ ...req.body, owner: req.user.id });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour une voiture
export const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

// Supprimer une voiture
export const removeCar = async (req, res, next) => {
  try {
    const deleted = await Car.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car removed" });
  } catch (err) {
    next(err);
  }
};


// Lister les voitures de l'utilisateur connecté
export const getMyCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ owner: req.user.id });
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};
