import { Router } from "express";
import user from "../controllers/userController.js";
import { verifyEmail } from "../middlewares/emailValidation.middleware.js";
import { validatePasswordFormat } from "../middlewares/passwordValidation.middleware.js";
import { validateFieldsRegister } from "../middlewares/fieldvalidation.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { roles } from "../config/config.js";

const router = Router();

// Rutas de autenticación
router.get("/all", authValidation(roles.admin), user.getUsers);
router.post(
  "/register",
  validateFieldsRegister,
  validatePasswordFormat,
  verifyEmail,
  user.register
);
router.get("/:username", user.getPublicProfile);
router.get("/profile/:username", authValidation(roles.user), user.getProfile);
router.post("/profile/:username/edit", authValidation(roles.user), user.editProfile);
router.get("/profile/courses:id", deleteCourse);
router.put("/profile/courses:id", deleteCourse);

export default router;
