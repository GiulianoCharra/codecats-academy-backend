import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const jwtAuth = {
  jwtSecretSize: process.env.JWT_SECRET_SIZE,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtRotationTime: process.env.JWT_ROTATION_TIME,
};

export const server = {
  port: process.env.PORT || 3000,
};

export const database = {
  url: process.env.DB_URL,
};

export const externalServices = {
  verifierAPiKey: process.env.VERIFIER_API_KEY,
};

export default {
  jwtAuth,
  server,
  database,
  externalServices,
};
