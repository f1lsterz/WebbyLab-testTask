import MovieService from "../services/movieService.js";

class MovieController {
  async createMovie(req, res, next) {
    try {
      const movie = await MovieService.createMovie(req.body);
      return res.status(201).json({ data: movie, status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async deleteMovie(req, res, next) {
    try {
      await MovieService.deleteMovie(req.params.id);
      return res.status(200).json({ status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async updateMovie(req, res, next) {
    try {
      const updatedMovie = await MovieService.updateMovie(
        req.params.id,
        req.body
      );
      return res.status(200).json({ data: updatedMovie, status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async getMovie(req, res, next) {
    try {
      const movie = await MovieService.getMovie(req.params.id);
      return res.status(200).json({ data: movie, status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async getListOfMovies(req, res, next) {
    try {
      const { data, meta } = await MovieService.getListOfMovies(req.query);
      return res.status(200).json({ data, meta, status: 1 });
    } catch (e) {
      next(e);
    }
  }

  async importMovies(req, res, next) {
    try {
      const buffer = req.file.buffer.toString("utf-8");
      const result = await MovieService.importMovies(buffer);

      res.status(200).json({
        data: result.movies,
        meta: { imported: result.imported, total: result.total },
        status: 1,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new MovieController();
