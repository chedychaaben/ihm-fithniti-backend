// index.js
import express from "express";
import path from 'path';
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Import des routes
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import rideRoute from "./routes/ride.routes.js";
import reservationRoute from "./routes/reservation.routes.js";
import adminRoute from "./routes/admin.routes.js";
import reviewRoute from "./routes/review.routes.js";
import carRoute from "./routes/car.routes.js";
import uploadRoute from "./routes/upload.routes.js";

const app = express();
const PORT = 8085;

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/rides", rideRoute);
app.use("/api/reservations", reservationRoute);
app.use("/api/admin", adminRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/cars", carRoute);
app.use("/api/uploads", uploadRoute);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Une erreur est survenue";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    error: errorMessage
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Backend lancé sur http://localhost:${PORT}`);
});
