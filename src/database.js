import { connect } from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const dbUri = process.env.DB_URI;
const user = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const coleccionUsers = process.env.COLLECION_USERS;

// Conexión a MongoDB
const client = new MongoClient(dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function runDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const admin = client.db(user);
    const db = client.db(dbName);

    // Send a ping to confirm a successful connection
    admin.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Listar las bases de datos
    console.log("Lista de bases de datos: ");
    let dbs = await admin.command({ listDatabases: 1, nameOnly: true });
    console.log(dbs.databases);

    // Listar las colecciones
    console.log("Lista de Colecciones: ");
    let cls = await db.collections();
    cls.forEach((c) => console.log(c.collectionName));

    // Listar las documentos
    console.log("Lista de usuarios: ");
    let users = db.collection(coleccionUsers);
    let resultado = users.find({});
    // Print returned documents
    for await (const doc of resultado) {
      console.log(doc);
    }
    //add user to collection
    console.log("Agregar nuevo usuario: ");
    let newUser = await users.findOne({ email: "juan@gmail.com" });
    console.log("Nuevo usuario:", newUser);
    if (newUser === null)
      await users.insertOne({ name: "Juan", email: "juan@gmail.com", password: "123" });
  } catch {
    console.error("No se pudo conectar con la db");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
