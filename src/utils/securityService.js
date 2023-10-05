import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { jwtConfig } from "../config/config.js";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

export function generateJwtToken(payload) {
  return jsonwebtoken.sign(payload, jwtConfig.jwtSecret, { expiresIn: jwtConfig.jwtExpiration });
}

export function verifyJwtToken(token) {
  return jsonwebtoken.verify(token, jwtConfig.jwtSecret);
}

export function generateEncryptedPassword(password) {
  return bcryptjs.hash(password, 10);
}

export function comparePassword(password, hashedPassword) {
  return bcryptjs.compare(password, hashedPassword);
}

// generate uuid
export function generateUuid() {
  return uuidv4();
}
// generate nanoid
export function generateNanoId() {
  return nanoid();
}

export default {
  generateJwtToken,
  verifyJwtToken,
  generateEncryptedPassword,
  comparePassword,
  generateUuid,
  generateNanoId,
};
