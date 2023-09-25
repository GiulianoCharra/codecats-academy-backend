import { Router } from "express";
const router = Router();
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

// Rutas CRUD de cursos
router.get("/cursos", getAllCourses);
router.get("/cursos:id", getCourseById);
router.post("/cursos", createCourse);
router.put("/cursos:id", updateCourse);
router.delete("/cursos:id", deleteCourse);

export default router;
