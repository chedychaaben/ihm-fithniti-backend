import express from "express";
import multer from 'multer';
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


router.post(
    '/', verifyToken, upload.single('Image'), (req, res) => { res.status(200).json({ message: "File uploaded", file: req.file })}  );
  
export default router;