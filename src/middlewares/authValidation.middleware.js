import { verifyJwtToken } from "../utils/securityService.js";

//function check role from a jwt
export function authValidation(allowedRoles) {
  return (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = verifyJwtToken(token);
    if (!payload || !allowedRoles.includes(payload.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. You don't have permission to perform this action." });
    }

    next();
  };
}

export default { authValidation };
