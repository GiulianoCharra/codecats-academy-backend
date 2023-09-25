import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

export default model("Course", courseSchema);
