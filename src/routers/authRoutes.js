import { Router } from "express";
import user from "../controllers/userController.js";
import { verifyEmail } from "../middlewares/emailValidation.middleware.js";
import { validatePasswordFormat } from "../middlewares/passwordValidation.middleware.js";
import { validateFieldsRegister } from "../middlewares/fieldvalidation.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { roles } from "../config/config.js";

const router = Router();

// Rutas de autenticación
router.get("/all", authValidation([roles.admin]), user.getUsers);
router.post("/register", validatePasswordFormat, verifyEmail, user.register);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.get("/:username", user.getPublicProfile);
router.get("/profile/:username", authValidation([roles.user, roles.admin]), user.getProfile);
router.put("/profile/:username/edit", authValidation([roles.user, roles.admin]), user.editProfile);

export default router;
