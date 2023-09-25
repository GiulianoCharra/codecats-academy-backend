import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";
import { verifyEmail } from "../services/email-verifier.js";

export async function register(req, res) {
  console.log("register a new user");
  try {
    const { username, email, password } = req.body;

    // Verificar si el correo electrónico ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    // Verificar si el correo electrónico es válido
    if (!(await verifyEmail(email))) {
      return res.status(400).json({ message: "Email is invalid" });
    }
    // Encriptar la contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Crear un nuevo usuario
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await newUser
      .save()
      .then((user) => console.log("User created: ", user))
      .catch((error) => console.error(error));

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function login(req, res) {
  console.log("login a user");
  try {
    const { email, password } = req.body;
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Verificar la contraseña
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Generar y enviar un token JWT
    const token = jsonwebtoken.sign({ userId: user._id }, "tu_secreto_secreto", {
      expiresIn: "1h",
    });
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
    res.status(500).json({ message: "Error en el servidor" });
  }
}
