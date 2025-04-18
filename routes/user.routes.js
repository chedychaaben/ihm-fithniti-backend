import express from "express";
import multer from 'multer';
import {  getAllUsers, getUser, updateUser, uploadProfileImage } from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

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
router.get("/:id", verifyUser, getUser)
router.post("/:id", verifyUser, updateUser)
// router.delete("/:id", verifyUser, deleteUser)
router.post('/XXXXXXXupload-profilepicture', upload.single('profileImage'), uploadProfileImage);

export default router