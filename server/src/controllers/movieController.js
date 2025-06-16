import MovieService from "../services/movieService.js";
import ApiError from "../utils/apiError.js";

class MovieController {
  async createMovie(req, res, next) {
    try {
      const { title, year, format, actors } = req.body;

      const missingFields = {};
      if (!title) missingFields.title = "REQUIRED";
      if (!year) missingFields.year = "REQUIRED";
      if (!format) missingFields.format = "REQUIRED";
      if (!actors) missingFields.actors = "REQUIRED";
      if (Object.keys(missingFields).length > 0) {
        throw new ApiError("FORMAT_ERROR", missingFields);
      }

      if (!Array.isArray(actors)) {
        throw new ApiError("INVALID_TYPE", {
          actors: "MUST_BE_ARRAY",
        });
      }

      const movie = await MovieService.createMovie({
        title,
        year,
        format,
        actors,
      });

      return res.status(201).json({ data: movie, status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ApiError("ID_REQUIRED", { id: "REQUIRED" });
      }

      await MovieService.deleteMovie(id);

      return res.status(200).json({ status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async updateMovie(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ApiError("ID_REQUIRED", { id: "REQUIRED" });
      }

      const { title, year, format, actors } = req.body;

      if (
        title === undefined &&
        year === undefined &&
        format === undefined &&
        actors === undefined
      ) {
        throw new ApiError("FORMAT_ERROR", {
          fields: "At least one field must be provided",
        });
      }

      if (!Array.isArray(actors)) {
        throw new ApiError("INVALID_TYPE", {
          actors: "MUST_BE_ARRAY",
        });
      }

      const updatedMovie = await MovieService.updateMovie(id, {
        title,
        year,
        format,
        actors,
      });

      return res.status(200).json({ data: updatedMovie, status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async getMovie(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ApiError("ID_REQUIRED", { id: "REQUIRED" });
      }

      const movie = await MovieService.getMovie(id);

      return res.status(200).json({ data: movie, status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async getListOfMovies(req, res, next) {
    try {
      const {
        actor,
        title,
        search,
        sort = "id",
        order = "ASC",
        limit = 20,
        offset = 0,
      } = req.query;

      const { data, meta } = await MovieService.getListOfMovies({
        actor,
        title,
        search,
        sort,
        order,
        limit,
        offset,
      });

      return res.status(200).json({
        data,
        meta,
        status: 1,
      });
    } catch (e) {
      next(e);
    }
  }

  async importMovies(req, res, next) {
    try {
      if (!req.file || !req.file.buffer) {
        throw new ApiError("FILE_REQUIRED", { file: "REQUIRED" });
      }

      const buffer = req.file.buffer.toString("utf-8");

      const result = await MovieService.importMovies(buffer);

      res.status(200).json({
        data: result.movies,
        meta: {
          imported: result.imported,
          total: result.total,
        },
        status: 1,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new MovieController();
