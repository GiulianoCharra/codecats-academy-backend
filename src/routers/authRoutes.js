import { Router } from "express";
import { register, login, getUsers } from "../controllers/authController.js";

const router = Router();

// Rutas de autenticación
router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
