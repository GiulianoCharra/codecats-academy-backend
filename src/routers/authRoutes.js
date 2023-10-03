import { Router } from "express";
import auth from "../controllers/authController.js";
import { verifyEmail } from "../middlewares/emailValidation.middleware.js";
import { validatePasswordFormat } from "../middlewares/passwordValidation.middleware.js";

const router = Router();

// Rutas de autenticación
router.post("/register", verifyEmail, validatePasswordFormat, auth.register);
router.post("/login", auth.login);
router.post("/logout", auth.logout);

export default router;
