import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./database.js";
import authRoutes from "./routers/authRoutes.js";
import courseRoutes from "./routers/courseRoutes.js";
import User from "./models/user.js";

// Carga variables de entorno desde un archivo .env
dotenv.config({ path: "./.env" });

// Configura la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Importa la conexión a la base de datos desde el módulo de conexión
await db(process.env.DB_URI);
console.log(await User.find({}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Rutas
app.get("/api/", (req, res) => {
  res.send("Bienvenido a la aplicación Codecats Academy.");
});
app.use("/api/users", authRoutes);
app.use("/api/courses", courseRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
