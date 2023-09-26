

export function validatePasswordFormat(req, res, next) {
  try {
    const { password } = req.body;

    const passwordFormat = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
    if (!password.match(passwordFormat)) {
      return res.status(400).json({ message: "Password is invalid" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error in the password validation" });
  }
}
