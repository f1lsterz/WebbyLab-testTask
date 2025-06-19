import express from "express";
import MovieController from "../controllers/movieController.js";
import multer from "multer";
import validateFile from "../middlewares/validateFileMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import { createMovieSchema } from "../utils/validations/createMovie.js";
import { idParamSchema } from "../utils/validations/idSchema.js";
import { updateMovieSchema } from "../utils/validations/updateMovie.js";
import { getListOfMoviesQuerySchema } from "../utils/validations/moviesListSchema.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post(
  "/",
  validateSchema({ body: createMovieSchema }),
  MovieController.createMovie
);

router.delete(
  "/:id",
  validateSchema({ params: idParamSchema }),
  MovieController.deleteMovie
);

router.patch(
  "/:id",
  validateSchema({ params: idParamSchema, body: updateMovieSchema }),
  MovieController.updateMovie
);

router.get(
  "/:id",
  validateSchema({ params: idParamSchema }),
  MovieController.getMovie
);

router.get(
  "/",
  validateSchema({ query: getListOfMoviesQuerySchema }),
  MovieController.getListOfMovies
);

router.post(
  "/import",
  upload.single("movies"),
  validateFile("movies"),
  MovieController.importMovies
);

export default router;
