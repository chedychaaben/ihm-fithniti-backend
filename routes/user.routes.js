import express from "express";
import { getAllUsers, getUser, updateUser, updateProfileImage, getProfileImage} from "../controllers/user.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router()


router.get("/", verifyAdmin, getAllUsers)
router.post('/update-profile-image', verifyToken, updateProfileImage)
router.get('/get-profile-image', verifyToken, getProfileImage)

router.get("/:id", verifyUser, getUser)
router.post("/:id", verifyUser, updateUser)
// router.delete("/:id", verifyUser, deleteUser)

export default router