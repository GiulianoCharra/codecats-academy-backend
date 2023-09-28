import bcryptjs from "bcryptjs";
import User from "../models/UserModel.js";
import { jwtTokenGenerator } from "../utils/jwtHandler.js";

export async function register(req, res) {
  console.log("register a new user");
  try {
    const { username, email, password } = req.body;
    // Encrypt the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save().catch((error) => console.error(error));

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function login(req, res) {
  console.log("login a user");
  try {
    const { email, password } = req.body;

    // Verify if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credentials are invalid" });
    }
    // Verify if the password is correct
    const passwordMatch = await bcryptjs.compare(String(password), user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credentials are invalid" });
    }

    // Generate a JWT
    const token = jwtTokenGenerator({ name: user.name, email: user.email, role: user.role });
    res.status(200).json({ message: "User logged successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

//Get all users from MongoDB
export async function getUsers(req, res) {
  console.log("get all users");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}
