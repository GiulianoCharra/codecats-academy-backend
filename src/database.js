import { connect } from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const uri = process.env.MONGODB_URI;

// Conexión a MongoDB
const client = new MongoClient(uri, {
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
    const admin = client.db("admin");
    const db = client.db("codecats-academy-db");

    // Send a ping to confirm a successful connection
    admin.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Listar las bases de datos
    let dbs = await admin.command({ listDatabases: 1, nameOnly: true });
    console.log("Lista de bases de datos: ", dbs.databases);

    // Listar las colecciones
    let cls = await db.collections();
    console.log("Lista de Colecciones: ");
    cls.forEach((c) => console.log(c.collectionName));

    // Listar las documentos
    let users = db.collection("users");
    console.log("Lista de usuarios: ");
    let resultado = users.find({});
    // Print returned documents
    for await (const doc of resultado) {
      console.log(doc);
    }
  } catch {
    console.error("No se pudo conectar con la db");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
