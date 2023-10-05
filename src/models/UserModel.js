import { Schema, model } from "mongoose";
import { roles } from "../config/config.js";

const classProgressSchema = new Schema(
  {
    classNumber: { type: Number, required: true, default: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  { _id: false }
);

const moduleProgressSchema = new Schema(
  {
    moduleNumber: { type: Number, required: true, default: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    classesProgress: [classProgressSchema],
  },
  { _id: false }
);

const courseProgressSchema = new Schema(
  {
    idCourse: { type: String, required: true, ref: "Course" },
    purchasedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    modulesProgress: [moduleProgressSchema],
  },
  { _id: false }
);

const userSchema = new Schema({
  idUser: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  username: {
    type: String,
    minLength: 3,
    maxLength: 30,
    unique: true,
  },
  name: { type: String, minLength: 3, maxLength: 30 },
  role: { type: String, enum: [roles.admin, roles.user], default: roles.user },
  description: { type: String, default: "" },
  inscribedCourses: {
    show: { type: Boolean, default: false },
    listCourses: [courseProgressSchema],
  },
  createdCourses: {
    show: { type: Boolean, default: false },
    listCourses: [{ type: String, ref: "Course" }],
  },
  desiredCourses: [{ type: String, ref: "Course" }],
  shoppingCart: [{ type: String, ref: "Course" }],
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  socialMedia: {
    show: { type: Boolean, default: false },
    socialLinks: {
      linkedin: { type: String, default: "" },
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  contactInfo: {
    phone: {
      show: { type: Boolean, default: false },
      value: { type: String, default: "" },
    },
    email: {
      show: { type: Boolean, default: false },
      value: { type: String, default: "" },
    },
  },
  achievements: {
    show: { type: Boolean, default: false },
    achievementsList: [
      {
        title: { type: String, default: "" },
      },
    ],
  },
});

export default model("User", userSchema);
