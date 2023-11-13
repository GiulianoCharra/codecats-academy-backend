import { cookieNames } from "../config/config.js";
import User from "../models/UserModel.js";
import auth from "../utils/securityService.js";

export async function register(req, res) {
  console.log("register a new user");
  try {
    const { username, email, password } = req.body;

    // Create the new user
    const newUser = await User.create({
      idUser: auth.generateUuid(),
      username,
      email,
      password: await auth.generateEncryptedPassword(password), // Encrypt the password
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
    if (!user || user.length === 0) {
      return res.status(401).json({ message: "Credentials are invalid" });
    }
    // Verify if the password is correct
    if (!(await auth.comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Credentials are invalid" });
    }

    // Generate a JWT
    const token = auth.generateJwtToken({
      idUser: user.idUser,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // Set access exposed headers
    res.header("Access-Control-Expose-Headers", "Authorization");

    res.header("authorization", `Bearer ${token}`).status(200).json({
      message: "User logged successfully",
      idUser: user.idUser,
      role: user.role,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in the server",
    });
  }
}

// logout
export async function logout(req, res) {
  console.log("logout a user");
  res.clearCookie(cookieNames.authTokenCookie);
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export default {
  register,
  login,
  logout,
};
