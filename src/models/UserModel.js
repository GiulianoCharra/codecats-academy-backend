import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  username: { type: String, required: true, minLength: 3, maxLength: 20 },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
