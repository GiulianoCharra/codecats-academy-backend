import { Router } from "express";
import { register, login, getUsers } from "../controllers/authController.js";
import { verifyEmail } from "../middlewares/emailValidationMiddleware.js";
import { validatePasswordFormat } from "../middlewares/passwordValidationMiddleware.js";
import { validateTypeField } from "../middlewares/validationMiddleware.js";

const router = Router();

// Rutas de autenticación
router.get("/", getUsers);
router.post("/register", validateTypeField, validatePasswordFormat, verifyEmail, register);
router.post("/login", login);

export default router;
