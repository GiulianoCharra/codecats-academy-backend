import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

export async function dbConnection(dbURL) {
  mongoose.connect(dbURL);
  return mongoose.connection;
}

// Probando cosas con mongodb
//#region

// export async function runDB() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     console.log("You successfully connected to MongoDB!");

//     await getListDatabases(client);
//     await getListCollections(client, dbName);
//     await listDocuments(client, dbName, coleccionUsers);
//     let newUser = new UserModel({ name: "Juan", email: "juan@gmail.com", password: "123" });
//     await addDocument(client, dbName, coleccionUsers, newUser);
//   } catch {
//     console.error("No se pudo conectar con la db");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// //function to show the list of mongodb databases, only the names
// export async function getListDatabases(client) {
//   let databasesList = await client.db().admin().listDatabases({ nameOnly: true });
//   console.log("Databases:");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));

//   //Otra forma de hacerlo
//   /*
//   let dbs = await admin.command({ listDatabases: 1, nameOnly: true });
//     console.log(dbs.databases);
//    */
// }

// //function to show the list of mongodb collections of a database
// export async function getListCollections(client, dbName) {
//   let collections = await client.db(dbName).listCollections().toArray();
//   console.log("Collections:");
//   collections.forEach((c) => console.log(` - ${c.name}`));
// }

// //funtion to show the list of documents of a mongodb collection
// export async function listDocuments(client, dbName, coleccionName) {
//   let result = await client.db(dbName).collection(coleccionName).find({}).toArray();
//   console.log("Documents:");
//   result.forEach((doc) => console.log(doc));
// }

// //funtion to add a document to a mongodb collection, previously verifying if it exists
// export async function addDocument(client, dbName, coleccionName, document) {
//   let result = await client.db(dbName).collection(coleccionName).findOne({ email: document.email });
//   if (result === null) await client.db(dbName).collection(coleccionName).insertOne(document);
// }

// //funtion that execute a query to a mongodb collection and return the result
// export async function executeQuery(client, dbName, coleccionName, query) {
//   let result = await client.db(dbName).collection(coleccionName).find(query).toArray();
//   return result;
// }

//#endregion
