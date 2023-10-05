import { Router } from "express";
import user from "../controllers/userController.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { roles } from "../config/config.js";

const router = Router();

// Admin routes
router.get("/all", authValidation([roles.admin]), user.getUsers);

// Public routes
router.get("/:username/courses", user.getUserCourses);
router.get("/:username", user.getPublicProfile);

// Private routes

router.post(
  "/:username/purchase/:courseId",
  authValidation([roles.user, roles.admin]),
  user.registerPurchase
);
router.get("/:username/profile", authValidation([roles.user, roles.admin]), user.getProfile);
router.put("/:username/profile/edit", user.editProfile);

router.post(
  "/:username/profile/courses",
  authValidation([roles.user, roles.admin]),
  user.createCourse
);
router.get(
  "/:username/profile/courses",
  authValidation([roles.user, roles.admin]),
  user.getAllMyCourses
);
router.get(
  "/:username/profile/courses/:courseId",
  authValidation([roles.user, roles.admin]),
  user.getMyCourseById
);
router.put(
  "/:username/profile/courses/:courseId",
  authValidation([roles.user, roles.admin]),
  user.updateCourse
);
router.delete(
  "/:username/profile/courses/:courseId",
  authValidation([roles.user, roles.admin]),
  user.deleteCourse
);

export default router;
