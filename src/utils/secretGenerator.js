import crypto from "crypto";
import {jwtAuth} from "../config/config.js";

// function generateRandomSecret() {
//   return crypto.randomBytes(32).toString("hex");
// }

function secretGenerator() {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let randomString = "";
  for (let i = 0; i < jwtAuth.jwtSecretSize; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }
  return randomString;
}

export { secretGenerator };
