import express from "express";
import { createRide, getAllRides, getRide, updateRide, deleteRide, findRides, joinRide,  getPopularRides } from "../controllers/ride.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { leaveRide } from "../controllers/ride.js";
const router = express.Router()

router.get("/", verifyAdmin, getAllRides)
router.post("/", verifyToken, createRide)
router.get("/find", findRides)
router.get("/popular", getPopularRides)

router.get("/:id", getRide)
router.get("/:id/join", verifyToken, joinRide)
router.patch("/:id", verifyUser, updateRide)
router.delete("/:id", verifyToken, deleteRide)
router.post("/:id/leave", verifyToken, leaveRide);
export default router