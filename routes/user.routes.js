import express from "express";
import multer from 'multer';
import { getAllUsers, getUser, updateUser, uploadProfileImage, uploadcinImage, uploadpermisImage } from "../controllers/user.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router()



// Set up Multer for file storage and define the storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Adjust the destination as needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage });

router.get("/", verifyAdmin, getAllUsers)
router.post('/upload-profilepicture', verifyToken, upload.single('Image'), uploadProfileImage)
router.post('/upload-cinpicture', verifyToken, upload.single('Image'), uploadcinImage)
router.post('/upload-permispicture', verifyToken, upload.single('Image'), uploadpermisImage)
router.get("/:id", verifyUser, getUser)
router.post("/:id", verifyUser, updateUser)
// router.delete("/:id", verifyUser, deleteUser)

export default router