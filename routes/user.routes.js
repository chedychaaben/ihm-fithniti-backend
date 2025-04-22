import express from "express";
import { getAllUsers, getUser, updateUser, updateProfileImage, getProfileImage} from "../controllers/user.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router()


router.get("/", verifyAdmin, getAllUsers)
router.post('/update-profile-image', verifyToken, updateProfileImage)
router.get('/get-profile-image/:id' , getProfileImage)

router.get("/:id", getUser) //verifyUser, 
router.post("/:id", verifyUser, updateUser)
// router.delete("/:id", verifyUser, deleteUser)

export default router