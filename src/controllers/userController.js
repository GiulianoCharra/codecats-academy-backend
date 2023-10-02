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
    if (!user) {
      return res.status(401).json({ message: "Credentials are invalid" });
    }
    // Verify if the password is correct
    if (!auth.comparePassword(password, user.password)) {
      return res.status(401).json({ message: "Credentials are invalid" });
    }

    // Generate a JWT
    const token = auth.generateJwtToken({
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    });
    res
      .header("authorization", `Bearer ${token}`)
      .status(200)
      .json({ message: "User logged successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
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

// Get a profile user by username
export async function getPublicProfile(req, res) {
  console.log("get the public profile");
  try {
    const { username } = req.params;
    const user = await User.aggregate([
      {
        $match: { username },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          username: 1,
          description: 1,
          image: 1,
          contactInfo: {
            phone: {
              $cond: {
                if: { $eq: ["$contactInfo.phone.show", true] },
                then: "$contactInfo.phone",
                else: null,
              },
            },
            email: {
              $cond: {
                if: { $eq: ["$contactInfo.email.show", true] },
                then: "$contactInfo.email",
                else: null,
              },
            },
          },
          socialMedia: {
            $cond: {
              if: { $eq: ["$socialLinks.show", true] }, // Filtra socialLinks.show igual a true
              then: "$socialMedia.socialLinks",
              else: null,
            },
          },
          createdCourses: {
            $cond: {
              if: { $eq: ["$createdCourses.show", true] }, // Filtra completedCourses.show igual a true
              then: "$createdCourses.listCourses",
              else: null,
            },
          },
          completedCourses: {
            $cond: {
              if: { $eq: ["$inscribedCourses.show", true] },
              then: {
                $filter: {
                  input: "$inscribedCourses.listCourses",
                  as: "course",
                  cond: { $eq: ["$$course.progress", 100] },
                },
              },
              else: null,
            },
          },
          achievements: {
            $cond: {
              if: { $eq: ["$achievements.show", true] }, // Filtra achievements.show igual a true
              then: "$achievements.achievementsList",
              else: null,
            },
          },
        },
      },
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

// Get ther user's profile
export async function getProfile(req, res) {
  console.log("get profile");
  try {
    const { username } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.email !== payload.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

// Update a profile user by username
export async function editProfile(req, res) {
  console.log("update profile");
  try {
    const { username } = req.params;
    const body = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.username !== username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    for (const key in body) {
      user[key] = body[key];
    }

    await user.save().catch((error) => console.error(error));
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export default {
  register,
  login,
  logout,
  getUsers,
  getPublicProfile,
  getProfile,
  editProfile,
};
