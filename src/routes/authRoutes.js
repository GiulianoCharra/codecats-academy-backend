import { Router } from "express";
const router = Router();
import { register, login, getUsers } from "../controllers/authController.js";

// Rutas de autenticación
router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
