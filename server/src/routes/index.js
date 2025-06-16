import express from "express";
import userRoutes from "./userRouter.js";
import movieRoutes from "./movieRouter.js";
import sessionRoutes from "./sessionRouter.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/movies", authMiddleware, movieRoutes);
router.use("/sessions", sessionRoutes);

export default router;
