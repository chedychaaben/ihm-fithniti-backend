// routes/car.routes.js
import express from "express";
import multer from 'multer';
import { addCar, updateCar, removeCar, getMyCars, uploadcarImage } from "../controllers/car.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

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

router.post("/", verifyToken, addCar);
router.post('/upload-carpicture', verifyToken, upload.single('Image'), uploadcarImage)
router.patch("/:id", verifyToken, updateCar);
router.delete("/:id", verifyToken, removeCar);
router.get('/getmycars', verifyToken, getMyCars);

export default router;
