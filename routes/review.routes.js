// routes/review.routes.js
import express from "express";
import { submitReview, getReviewsByUser } from "../controllers/review.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, submitReview);
router.get("/user/:userId", getReviewsByUser);

export default router;
