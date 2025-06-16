import { Movie } from "./movieModel.js";
import { Actor } from "./actorModel.js";
import { MovieActors } from "./movieActors.js";

export default function defineAssociations() {
  Movie.belongsToMany(Actor, {
    through: MovieActors,
    as: "actors",
    foreignKey: {
      name: "movieId",
      allowNull: false,
      onDelete: "CASCADE",
    },
    otherKey: "actorId",
  });

  Actor.belongsToMany(Movie, {
    through: MovieActors,
    as: "movies",
    foreignKey: {
      name: "actorId",
      allowNull: false,
      onDelete: "CASCADE",
    },
    otherKey: "movieId",
  });
}
