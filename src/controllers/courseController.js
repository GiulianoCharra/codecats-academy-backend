import Course from "../models/CourseModel.js";

export async function getAllCourses(req, res) {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function getCourseById(req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function createCourse(req, res) {
  try {
    const { title, description, price } = req.body;
    const course = new Course({
      title,
      description,
      price,
    });
    await course.save();
    res.status(201).json({ message: "Curso creado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function updateCourse(req, res) {
  try {
    const { title, description, price } = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, {
      title,
      description,
      price,
    });
    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    res.status(200).json({ message: "Curso actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function deleteCourse(req, res) {
  try {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    res.status(200).json({ message: "Curso eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}
