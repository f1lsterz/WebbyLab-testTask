import { Movie } from "../models/movieModel.js";
import { Actor } from "../models/actorModel.js";
import { Op, fn, col, where as sequelizeWhere } from "sequelize";
import ApiError from "../utils/apiError.js";

class MovieService {
  async createMovie(movieData) {
    const { title, year, format, actors } = movieData;

    const existing = await Movie.findOne({
      where: { title },
      include: { model: Actor, as: "actors" },
    });
    if (existing) {
      throw new ApiError("MOVIE_EXISTS", { title: "NOT_UNIQUE" });
    }

    const newMovie = await Movie.create({ title, year, format });
    if (actors && Array.isArray(actors)) {
      const actorInstances = [];
      for (const name of actors) {
        const [actor] = await Actor.findOrCreate({ where: { name } });
        actorInstances.push(actor);
      }
      await newMovie.addActors(actorInstances);
    }

    const createdMovie = await Movie.findByPk(newMovie.id, {
      include: {
        model: Actor,
        as: "actors",
        attributes: ["id", "name", "createdAt", "updatedAt"],
        through: { attributes: [] },
      },
    });

    const movieJson = createdMovie.toJSON();

    const orderedMovie = {
      id: movieJson.id,
      title: movieJson.title,
      year: movieJson.year,
      format: movieJson.format,
      actors: movieJson.actors,
      createdAt: movieJson.createdAt,
      updatedAt: movieJson.updatedAt,
    };

    return orderedMovie;
  }

  async deleteMovie(id) {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new ApiError("MOVIE_NOT_FOUND", { id });
    }

    await movie.destroy();
  }

  async updateMovie(id, movieData) {
    const { title, year, format, actors } = movieData;

    const movie = await Movie.findByPk(id, {
      include: {
        model: Actor,
        as: "actors",
      },
    });

    if (!movie) {
      throw new ApiError("MOVIE_NOT_FOUND", { id });
    }

    if (title !== undefined) movie.title = title;
    if (year !== undefined) movie.year = year;
    if (format !== undefined) movie.format = format;

    await movie.save();

    if (actors !== undefined) {
      const actorInstances = [];
      for (const name of actors) {
        const [actor] = await Actor.findOrCreate({ where: { name } });
        actorInstances.push(actor);
      }
      await movie.setActors(actorInstances);
    }

    const updatedMovie = await Movie.findByPk(id, {
      include: {
        model: Actor,
        as: "actors",
        attributes: ["id", "name", "createdAt", "updatedAt"],
        through: { attributes: [] },
      },
    });

    const movieJson = updatedMovie.toJSON();

    const orderedMovie = {
      id: movieJson.id,
      title: movieJson.title,
      year: movieJson.year,
      format: movieJson.format,
      actors: movieJson.actors,
      createdAt: movieJson.createdAt,
      updatedAt: movieJson.updatedAt,
    };

    return orderedMovie;
  }

  async getMovie(id) {
    const movie = await Movie.findByPk(id, {
      include: {
        model: Actor,
        as: "actors",
        attributes: ["id", "name", "createdAt", "updatedAt"],
        through: { attributes: [] },
      },
    });

    if (!movie) {
      throw new ApiError("MOVIE_NOT_FOUND", { id });
    }

    const movieJson = movie.toJSON();

    const orderedMovie = {
      id: movieJson.id,
      title: movieJson.title,
      year: movieJson.year,
      format: movieJson.format,
      actors: movieJson.actors,
      createdAt: movieJson.createdAt,
      updatedAt: movieJson.updatedAt,
    };

    return orderedMovie;
  }

  async getListOfMovies({
    actor,
    title,
    search,
    sort = "id",
    order = "ASC",
    limit = 20,
    offset = 0,
  }) {
    const whereConditions = [];
    const actorConditions = [];

    if (title) {
      whereConditions.push(
        sequelizeWhere(fn("LOWER", col("title")), {
          [Op.like]: `%${title.toLowerCase()}%`,
        })
      );
    }

    if (search) {
      whereConditions.push(
        sequelizeWhere(fn("LOWER", col("title")), {
          [Op.like]: `%${search.toLowerCase()}%`,
        })
      );
      actorConditions.push(
        sequelizeWhere(fn("LOWER", col("name")), {
          [Op.like]: `%${search.toLowerCase()}%`,
        })
      );
    }

    if (actor) {
      actorConditions.push(
        sequelizeWhere(fn("LOWER", col("name")), {
          [Op.like]: `%${actor.toLowerCase()}%`,
        })
      );
    }

    const sortFields = ["id", "title", "year"];
    const sortBy = sortFields.includes(sort) ? sort : "id";
    const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const total = await Movie.count({
      where: whereConditions.length ? { [Op.and]: whereConditions } : undefined,
      include: actorConditions.length
        ? [
            {
              model: Actor,
              as: "actors",
              where: { [Op.and]: actorConditions },
            },
          ]
        : [],
      distinct: true,
    });

    const movies = await Movie.findAll({
      where: whereConditions.length ? { [Op.and]: whereConditions } : undefined,
      include: actorConditions.length
        ? [
            {
              model: Actor,
              as: "actors",
              where: { [Op.and]: actorConditions },
              attributes: ["id", "name"],
              through: { attributes: [] },
              required: true,
            },
          ]
        : [],
      order:
        sortBy === "title"
          ? [[fn("LOWER", col("title")), sortOrder]]
          : [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    if (sortBy === "title") {
      movies.sort(
        (a, b) =>
          a.title.localeCompare(b.title, "uk", { sensitivity: "base" }) *
          (sortOrder === "DESC" ? -1 : 1)
      );
    }

    return {
      data: movies,
      meta: {
        total,
      },
    };
  }

  async importMovies(text) {
    const movieBlocks = text
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter((block) => block.length > 0);

    const movies = [];

    for (const block of movieBlocks) {
      const lines = block.split("\n").map((line) => line.trim());

      const movie = {};
      for (const line of lines) {
        if (line.startsWith("Title:")) {
          movie.title = line.slice(6).trim();
        } else if (line.startsWith("Release Year:")) {
          movie.year = parseInt(line.slice(13).trim());
        } else if (line.startsWith("Format:")) {
          movie.format = line.slice(7).trim();
        } else if (line.startsWith("Stars:")) {
          movie.actors = line
            .slice(6)
            .split(",")
            .map((a) => a.trim());
        }
      }

      if (!movie.title || !movie.year || !movie.format || !movie.actors) {
        continue;
      }

      try {
        const created = await this.createMovie(movie);
        movies.push({
          id: created.id,
          title: created.title,
          year: created.year.toString(),
          format: created.format,
          createdAt: created.createdAt,
          updatedAt: created.updatedAt,
        });
      } catch (err) {
        continue;
      }
    }

    return {
      movies,
      imported: movies.length,
      total: movieBlocks.length,
    };
  }
}

export default new MovieService();
