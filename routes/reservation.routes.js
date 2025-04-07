// routes/reservation.js
import express from "express";
import {
  bookRide,
  cancelReservation,
  confirmReservation
} from "../controllers/reservation.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, bookRide);
router.patch("/:id/confirm", verifyToken, confirmReservation);
router.delete("/:id", verifyToken, cancelReservation);

export default router;