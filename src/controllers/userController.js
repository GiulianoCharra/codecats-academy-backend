import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";
import auth from "../utils/securityService.js";

//Get all users from MongoDB
export async function getAllUsers(req, res) {
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
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function getUserCourses(req, res) {
  console.log("get all courses");
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function registerPurchase(req, res) {
  console.log("register purchase");
  try {
    const { idCourse } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ email: payload.email }).select("inscribedCourses");

    if (!user || user.leghth === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const isCoursePurchased = user.inscribedCourses.listCourses.find(
      (course) => course.idCourse === idCourse
    );
    if (isCoursePurchased) {
      return res.status(409).json({ message: "Course already purchased" });
    }

    const curso = await Course.findOne({ idCourse: req.body.idCourse });
    if (!curso || curso.leghth === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    curso.numberOfStudents += 1;

    const coursePurchased = {
      idCourse: curso.idCourse,
      modulesProgress: [],
    };

    for (const mod of curso.modules) {
      const module = {
        number: mod.number,
        classesProgress: [],
      };
      for (const cls of mod.classes) {
        const clase = {
          number: cls.number,
        };
        module.classesProgress.push(clase);
      }
      coursePurchased.modulesProgress.push(module);
    }

    user.inscribedCourses.listCourses.push(coursePurchased);
    await curso.save();
    await user.save();
    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
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
    if (!user || user.leghth === 0) {
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

    if (!user || user.leghth === 0) {
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

export async function createCourse(req, res) {
  console.log("create course");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ email: payload.email }).select("idUser createdCourses");
    if (!user || user.leghth === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const body = req.body;
    if (!body || body.length === 0) {
      return res.status(400).json({ message: "it was expected an array" });
    }
    await Course.deleteMany({}); // Delete all courses
    user.createdCourses.listCourses = [];
    await user.save();

    const coursePromises = body.map(async (course) => {
      if (!course.instructors) {
        course.instructors = [user._id];
      }
      if (!course.idCourse) {
        course.idCourse = auth.generateNanoId();
      }
      let newCourse = await Course.create({
        ...course,
        creator: user.idUser,
      });
      return newCourse.idCourse;
    });

    const courseIds = await Promise.all(coursePromises);
    user.createdCourses.listCourses = user.createdCourses.listCourses.concat(courseIds);
    await user.save();

    res.status(201).json({
      message: "Course created successfully",
      numberCoursesCreated: "It was created " + body.length + " courses",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function getAllMyCourses(req, res) {
  console.log("get all my courses");
  try {
    const username = req.params.username;
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ email: payload.email }).select(
      "-_id username createdCourses"
    );

    if (!user || user.leghth === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.username !== username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //find courses by id in the list of courses created by the user
    const courses = await Course.find({
      idCourse: { $in: user.createdCourses.listCourses },
    }).select("-_id");
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error ir the server" });
  }
}

export async function getMyCourseById(req, res) {
  console.log("get one of my courses by id");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ email: payload.email }).select("idUser");
    const course = await Course.findOne({ idCourse: req.body.idCourse }).select("-_id");

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!course || course.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (user.idUser !== course.creator) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function updateCourse(req, res) {
  console.log("update course");
  try {
    const body = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ email: payload.email }).select("_id");
    const course = await Course.findOne({ idCourse: body.idCourse });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!course || course.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (user._id.toString() !== course.creator.toString()) {
      return res.status(404).json({ message: "Resource not found" });
    }

    for (const key in body) {
      course[key] = body[key];
    }
    await course.save();
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export async function deleteCourse(req, res) {
  console.log("delete course");
  try {
    const { idCourse } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = auth.verifyJwtToken(token);
    const user = await User.findOne({ email: payload.email }).select("_id");
    const course = await Course.findOne({ idCourse });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!course || course.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (user._id.toString() !== course.creator.toString()) {
      return res.status(404).json({ message: "Resource not found" });
    }

    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export default {
  getUsers: getAllUsers,
  getPublicProfile,
  getUserCourses,
  registerPurchase,
  getProfile,
  editProfile,
  createCourse,
  getAllMyCourses,
  getMyCourseById,
  updateCourse,
  deleteCourse,
};
