import { Router } from "express";
const router = Router();
import courses from "../controllers/courseController.js";

// Public routes
router.get("/", courses.getAllCourses);
router.get("/:idCourse", courses.getCourseById);

export default router;
