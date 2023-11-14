import { Router } from "express";
const router = Router();
import courses from "../controllers/courseController.js";

// Public routes
router.get("/", courses.getAllCourses);
router.get("/:idCourse", courses.getCourseById);
router.get("/user/:username", courses.getCoursesByUser);

export default router;
