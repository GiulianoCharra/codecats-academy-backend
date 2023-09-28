import jsonwebtoken from "jsonwebtoken";
import { jwtAuth } from "../config/config.js";
//funtion that recieve an object and return a jwt token

export function jwtTokenGenerator(payload) {
  return jsonwebtoken.sign(payload, jwtAuth.jwtSecret, { expiresIn: jwtAuth.jwtExpiresIn });
}

export function jwtTokenVerifier(token) {
  return jsonwebtoken.verify(token, jwtAuth.jwtSecret);
}

export default { jwtTokenGenerator, jwtTokenVerifier };
