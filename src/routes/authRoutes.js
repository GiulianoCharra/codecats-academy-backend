import { Router } from "express";
const router = Router();
import { register, login } from "../controllers/authController.js";

// Rutas de autenticación
router.post("/register", register);
router.post("/login", login);

export default router;
