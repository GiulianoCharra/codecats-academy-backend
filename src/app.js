import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database.js";
import authRoutes from "./routers/authRoutes.js";
import courseRoutes from "./routers/courseRoutes.js";

// Load environment variables from an .env file
dotenv.config({ path: "./.env" });

// Config the express app
const app = express();
const port = process.env.PORT || 3000;

// Import the connection to the database from the connection module
await dbConnection(process.env.DB_URI);

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
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
