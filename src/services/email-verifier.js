//funcion que provee el servicio de verificacion de email a traves del consumo de la API de Verifier

const verifierURL = "https://verifier.meetchopra.com/verify/";

export async function verifyEmail(email) {
  try {
    const fullURL = `${verifierURL}${email}?token=${process.env.VERIFIER_API_KEY}`;

    console.log("fullURL: ", fullURL);
    const response = await fetch(fullURL);
    const data = await response.json();
    if (data.status === "invalid") return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
