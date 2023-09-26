import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/UserModel.js";

export async function register(req, res) {
  console.log("register a new user");
  try {
    const { username, email, password } = req.body;
    // Encriptar la contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Crear un nuevo usuario
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
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credentials are invalid" });
    }

    // Generate a JWT
    const token = jsonwebtoken.sign(
      {
        name: user.username,
        userMail: user.email,
        userRol: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      "tu_secreto_secreto"
    );
    res.status(200).json({ token });
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
