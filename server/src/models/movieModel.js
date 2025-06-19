import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConfig.js";
import MOVIE_FORMAT_TYPES from "../utils/movieFormatType.js";

export const Movie = sequelize.define("Movies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  format: {
    type: DataTypes.ENUM(...Object.values(MOVIE_FORMAT_TYPES)),
    allowNull: false,
  },
});
