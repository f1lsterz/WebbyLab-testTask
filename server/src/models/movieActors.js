import { sequelize } from "../db/dbConfig.js";
import { DataTypes } from "sequelize";
import { Movie } from "./movieModel.js";
import { Actor } from "./actorModel.js";

export const MovieActors = sequelize.define(
  "MovieActors",
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: "id",
      },
    },
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Actor,
        key: "id",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["movieId", "actorId"],
      },
    ],
    timestamps: false,
  }
);
