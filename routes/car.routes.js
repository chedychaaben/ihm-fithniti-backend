// routes/car.routes.js
import express from "express";
import { addCar, updateCar, removeCar } from "../controllers/car.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addCar);
router.patch("/:id", verifyToken, updateCar);
router.delete("/:id", verifyToken, removeCar);

export default router;
