import express from "express";
import { banUser, warnUser, unbanUser } from "../controllers/admin.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.patch("/warn/:id", verifyAdmin, warnUser);
router.delete("/ban/:id", verifyAdmin, banUser);
router.delete("/unban/:id", verifyAdmin, unbanUser);

export default router;
