import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB (reemplaza 'mongodb://localhost/tu_base_de_datos' con tu URL de conexión)
connect("mongodb://localhost/tu_base_de_datos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

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
