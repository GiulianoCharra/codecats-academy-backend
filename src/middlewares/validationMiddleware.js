import User from "../models/UserModel.js";

// Función para verificar si los campos requeridos están presentes en la solicitud
function checkRequiredFields(body, schemaAttrs) {
  const missingFields = [];
  for (const attr in schemaAttrs) {
    if (schemaAttrs[attr].required && !body[attr]) {
      missingFields.push(attr);
    }
  }
  return missingFields;
}

// Verify if the fields have the correct type according to the user schema
function checkFieldTypes(body, schemaAttrs) {
  for (const attr in body) {
    console.log(attr, typeof body[attr]);
    console.log(schemaAttrs[attr].type.name.toLowerCase());
    if (typeof body[attr] !== schemaAttrs[attr].type.name.toLowerCase()) {
      return false;
    }
  }
  return true;
}

// Middleware to validate required fields and field types
export function validateTypeField(req, res, next) {
  try {
    const body = req.body;
    const schemaUserAttrs = User.schema.obj;

    const missingFields = checkRequiredFields(body, schemaUserAttrs);
    if (missingFields.length > 0) {
      return res.status(400).json({ mensaje: "Missing required fields", missingFields });
    }

    /*
    const correctTypes = checkFieldTypes(body, schemaUserAttrs);
    if (!correctTypes) {
      return res.status(400).json({ mensaje: "One or more fields have an incorrect type" });
    }
    */

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error in the required fields validation" });
  }
}
