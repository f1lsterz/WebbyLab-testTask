import express from "express";
import SessionController from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", SessionController.createSession);

export default router;
