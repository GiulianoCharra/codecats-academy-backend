import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";
import auth from "../utils/securityService.js";

export async function getAuthorCourses(req, res) {
  console.log("get all courses");
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}
export async function getAllCourses(req, res) {
  console.log("get all courses");
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function getCourseById(req, res) {
  console.log("get course by id");
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function createCourse(req, res) {
  console.log("create course");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const body = req.body;
    const course = await Course.create({
      idCourse: auth.generateUuid(),
      ...body,
      creator: user._id,
      instructors: [user._id],
    });
    await course.save();
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function getAllMyCourses(req, res) {
  console.log("get all my courses");
  try {
    const { createdCourses } = req.body;
    const courses = await Course.find({ _id: { $in: createdCourses } });
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error ir the server" });
  }
}

export async function getMyCourseById(req, res) {
  console.log("get my course by id");
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Cuourse not found" });
    }
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function updateCourse(req, res) {
  console.log("update course");
  try {
    const { title, description, price } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, price },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function deleteCourse(req, res) {
  console.log("delete course");
  try {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}
