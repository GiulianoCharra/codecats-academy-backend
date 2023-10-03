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
router.get("/:username/profile", user.getProfile);
router.put("/:username/profile/edit", user.editProfile);

router.post("/:username/profile/courses", user.createCourse);
router.get("/:username/profile/courses", user.getAllMyCourses);
router.get("/:username/profile/courses/:id", user.getMyCourseById);
router.put("/:username/profile/courses/:id", user.updateCourse);
router.delete("/:username/profile/courses/:id", user.deleteCourse);

export default router;
