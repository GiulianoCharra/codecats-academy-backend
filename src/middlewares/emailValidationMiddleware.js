import User from "../models/UserModel.js";

const verifierURL = "https://verifier.meetchopra.com/verify/";

//Verify the email format by using the API Verifier
async function validateEmailFormat(email) {
  const fullURL = `${verifierURL}${email}?token=${process.env.VERIFIER_API_KEY}`;
  const response = await fetch(fullURL);
  const data = await response.json();
  return data.status === true;
}

// Verify if the email is already in use
async function checkDuplicateEmail(email) {
  const existingUser = await User.findOne({ email });
  return existingUser !== null;
}

// Middleware to verify the email
export async function verifyEmail(req, res, next) {
  try {
    const { email } = req.body;
    const isValidFormat = await validateEmailFormat(email);
    if (!isValidFormat) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    const isDuplicateEmail = await checkDuplicateEmail(email);
    if (isDuplicateEmail) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
