import { Schema, model } from "mongoose";

//Schema of a course
const courseSchema = new Schema({
  idCourse: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  },
  language: {
    type: String,
  },
  courseDurationMinutes: {
    type: Number,
    required: true,
  },
  courseModality: {
    type: String,
    enum: ["modules", "classes", "activities"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  instructors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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
  },
  cantModules: {
    type: Number,
    default: 0,
  },
  cantClasses: {
    type: Number,
    default: 0,
  },
  modules: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      durationMinutes: {
        type: Number,
        required: true,
      },
      cantClasses: {
        type: Number,
        default: 0,
      },
      classes: [
        {
          number: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          durationMinutes: {
            type: Number,
            required: true,
          },
          additionalMaterial: {
            type: String, // URLs for additional resources.
          },
        },
      ],
    },
  ],
});

export default model("Course", courseSchema);
