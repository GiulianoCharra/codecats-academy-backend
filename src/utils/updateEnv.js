import { writeFile } from "fs";

function updateEnvFile(key, value) {
  const envData = `# Archivo .env generado automáticamente\n${key}=${value}\n`;

  writeFile(".env", envData, (err) => {
    if (err) {
      console.error("Error al modificar el archivo .env:", err);
    } else {
      console.log("Archivo .env actualizado exitosamente");
    }
  });
}

export default updateEnvFile;
