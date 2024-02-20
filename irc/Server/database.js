const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongo_uri = process.env.MONGO_URI;

/**
 * Asynchronously establishes a connection to Mongoose.
 *
 * @return {Promise} The Mongoose connection object.
 *
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
async function createMongooseConnection() {
  try {
    const connection = await mongoose.connect(mongo_uri);
  } catch (error) {
    console.error(`Erreur lors de la connexion à mongodb: ${error}`);
  }
}

module.exports = createMongooseConnection;
