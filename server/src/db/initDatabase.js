import { sequelize } from "./dbConfig.js";
import defineAssociations from "../models/associations.js";

export default async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to SQLite database successfully.");

    defineAssociations();

    await sequelize.sync();
    console.log("All models synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
