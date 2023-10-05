import Course from "../models/CourseModel.js";

export async function getAllCourses(req, res) {
  console.log("get all courses");
  try {
    const courses = await Course.aggregate([
      {
        $unset: ["_id", "modules._id", "modules.classes._id"],
      },
    ]);
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function getCourseById(req, res) {
  console.log("get course by id");
  try {
    const course = await Course.aggregate([
      { $match: { idCourse: req.params.idCourse } },
      {
        $unset: ["_id", "modules._id", "modules.classes._id"],
      },
    ]);

    if (!course || course.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export default {
  getAllCourses,
  getCourseById,
};
