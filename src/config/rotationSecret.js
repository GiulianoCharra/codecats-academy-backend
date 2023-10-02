import { jwtConfig } from "./config.js";
import { secretGenerator } from "../utils/secretGenerator.js";

function secretRotation() {
  console.log("Secret rotation configured");
  setInterval(() => {
    const newSecret = secretGenerator();
    process.env.JWT_SECRET = newSecret;
    console.log("New secret: ", newSecret);
  }, jwtConfig.jwtRotationTime); // 7 days
}

export default secretRotation;
