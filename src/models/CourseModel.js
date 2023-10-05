import { Schema, model } from "mongoose";

const classSchema = new Schema(
  {
    classNumber: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "Class.",
    },
    durationMinutes: {
      type: Number,
      default: 0,
    },
    additionalMaterial: {
      type: String, // URLs for additional resources.
    },
  },
  {
    _id: false,
  }
);

const moduleSchema = new Schema(
  {
    moduleNumber: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "Module.",
    },
    description: {
      type: String,
      default: "No description provided.",
    },
    classes: [classSchema],
  },
  {
    _id: false,
  }
);

//Schema of a course
const courseSchema = new Schema({
  idCourse: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description provided.",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  certification: {
    type: Boolean,
    default: false,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "expert"],

    default: "beginner",
  },
  category: {
    type: String,
    enum: [
      "Introduction to Programming",
      "Web Development",
      "Data Science",
      "Mobile App Development",
      "Game Development",
      "Artificial Intelligence",
      "Cybersecurity",
      "Software Engineering",
      "Database Management",
      "Cloud Computing",
    ],
    default: "Introduction to Programming",
  },
  language: {
    type: String,
    default: "English",
  },
  courseDurationMinutes: {
    type: Number,
    default: 0,
  },
  courseModality: {
    type: String,
    enum: ["modules", "classes", "activities", "video", "quiz"],
  },
  creator: { type: String, required: true, ref: "User" },
  instructors: [{ type: String, required: true, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  numberOfStudents: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  image: {
    type: String,
    default: "",
  },
  cantModules: {
    type: Number,
    default: 0,
  },
  cantClasses: {
    type: Number,
    default: 0,
  },
  modules: [moduleSchema],
});

export default model("Course", courseSchema);
