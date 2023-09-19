import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import database from "./database.js";

const app = express();

const port = process.env.PORT || 3000;
database();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/users", authRoutes);
app.use("/api/courses", courseRoutes);

app.get("/users", (req, res) => {
  res.send("Lista de usuarios");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
