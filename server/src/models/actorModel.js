import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConfig.js";

export const Actor = sequelize.define("Actors", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
