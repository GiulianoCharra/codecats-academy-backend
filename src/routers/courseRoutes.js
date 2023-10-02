import { Router } from "express";
const router = Router();
import {
  getAllCourses,
  getCourseById,
  getAuthorCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllMyCourses,
  getMyCourseById,
} from "../controllers/courseController.js";

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/:username/courses:id", getAuthorCourses);

// private routes
router.post("/profile/courses", createCourse);
router.get("/profile/courses", getAllMyCourses);
router.get("/profile/courses/:id", getMyCourseById);
router.put("/profile/courses/:id", updateCourse);
router.delete("/profile/courses/:id", deleteCourse);

export default router;
