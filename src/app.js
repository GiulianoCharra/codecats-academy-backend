import express from "express";
import cors from "cors";
import { database, server } from "./config/config.js";
import { dbConnection } from "./config/database.js";
import authRoutes from "./routers/authRoutes.js";
import courseRoutes from "./routers/courseRoutes.js";
import secretRotation from "./config/rotationSecret.js";

// Config the express app
const app = express();
// Import the connection to the database from the connection module
await dbConnection(database.url);
secretRotation();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/", (req, res) => {
  res.send("Welcome to the Codecats Academy application.");
});
app.use("/api/users", authRoutes);
app.use("/api/courses", courseRoutes);

// Init the server
app.listen(server.port, () => {
  console.log(`Server running on port ${server.port}`);
});
