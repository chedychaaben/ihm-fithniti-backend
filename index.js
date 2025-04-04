import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"

// Tes routes existantes
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import rideRoute from "./routes/ride.routes.js";
//import sequelize from "./db.js";
import dotenv from 'dotenv';
dotenv.config();  // Ensure environment variables are loaded

//sequelize.sync({ alter: true }) // ou { force: true } pour recréer
//  .then(() => console.log("✅ Tables MySQL synchronisées"))
//  .catch((err) => console.error("❌ Erreur de sync Sequelize", err));

const app = express();
const PORT = 8085;

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};
// Connexion MySQL (PAS de fichier .env)
//const db = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "",     // ← Mets ton mot de passe ici si tu en as un
//  database: "ride"  // ← Nom de ta base MySQL visible dans phpMyAdmin
//});

//db.connect((err) => {
//  if (err) {
//    console.error("❌ Erreur de connexion MySQL :", err);
//    process.exit(1);
//  }
//  console.log("✅ Connecté à MySQL !");
//});

// Pour pouvoir utiliser db ailleurs
//export { db };

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",  // ou selon ton frontend
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // ⚠️ PAS "*"
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/rides", rideRoute);

// Middleware pour les erreurs
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
  connectDB()
  console.log(`🚀 Backend lancé sur http://localhost:${PORT}`);
});