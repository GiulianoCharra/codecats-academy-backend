import express from "express";
import cors from "cors";
import { database, server } from "./config/config.js";
import { dbConnection } from "./config/database.js";
import userRoutes from "./routers/userRoutes.js";
import authRoutes from "./routers/authRoutes.js";
import courseRoutes from "./routers/courseRoutes.js";
import secretRotation from "./config/rotationSecret.js";
import { rateLimit } from "express-rate-limit";

// Config the express app
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 40, // Máximo de 100 solicitudes por ventana
  message: "Demasiadas solicitudes desde esta IP. Por favor, inténtalo de nuevo más tarde.",
});

// Import the connection to the database from the connection module
await dbConnection(database.url);
secretRotation();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(limiter);

// Routes
app.get("/api/", (req, res) => {
  res.send("Welcome to the Codecats Academy API.");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// Init the server
app.listen(server.port, () => {
  console.log(`Server running on port ${server.port}`);
});
