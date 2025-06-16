import express from "express";
import MovieController from "../controllers/movieController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/", MovieController.createMovie);

router.delete("/:id", MovieController.deleteMovie);

router.patch("/:id", MovieController.updateMovie);

router.get("/:id", MovieController.getMovie);

router.get("/", MovieController.getListOfMovies);

router.post("/import", upload.single("movies"), MovieController.importMovies);

export default router;
