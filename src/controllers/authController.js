const bcrypt = require("bcrypt");
import { sign } from "jsonwebtoken";
import User, { findOne } from "../models/User.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    // Verificar si el correo electrónico ya está en uso
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo electrónico ya está en uso" });
    }
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crear un nuevo usuario
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    // Verificar si el usuario existe
    const user = await findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Generar y enviar un token JWT
    const token = sign({ userId: user._id }, "tu_secreto_secreto", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}
