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
    const car = await Car.findOne({ _id: req.params.id, owner: req.user.id });

    if (!car) {
      return res.status(404).json({ message: "Car not found or not owned by you" });
    }

    // Marquer la voiture comme supprimée
    car.isSoftDeleted = true;
    await car.save();

    res.status(200).json({ message: "Car marked as deleted" });
  } catch (err) {
    next(err);
  }
};


// Lister les voitures de l'utilisateur connecté
export const getMyCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ owner: req.user.id, isSoftDeleted: false });
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};


export const updateCarImage = async (req, res, next) => {
  const carId = req.params.id;
  const fileNameInUploadsFolder = req.file.fileNameInUploadsFolder


  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${fileNameInUploadsFolder}`;

    const updatedCar = await Car.findOneAndUpdate(
      { _id: carId, owner: req.user.id },
      { carPicture: imageUrl },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found or not owned by you' });
    }

    res.status(200).json({
      message: 'Car image uploaded successfully',
      car: updatedCar
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};