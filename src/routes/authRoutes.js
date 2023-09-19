import { Router } from "express";
const router = Router();
import { register, login, getAll } from "../controllers/authController.js";

// Rutas de autenticación
router.get("/", getAll);
router.post("/register", register);
router.post("/login", login);

export default router;
