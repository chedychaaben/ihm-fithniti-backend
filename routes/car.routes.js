// routes/car.routes.js
import express from "express";
import { addCar, updateCar, removeCar, getMyCars, updateCarImage } from "../controllers/car.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


router.post("/", verifyToken, addCar);
router.post('/update-car-image/:id', verifyToken, updateCarImage)
router.patch("/:id", verifyToken, updateCar);
router.delete("/:id", verifyToken, removeCar);
router.get('/getmycars', verifyToken, getMyCars);

export default router;
