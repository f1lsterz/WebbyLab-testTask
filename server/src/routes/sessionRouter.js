import express from "express";
import SessionController from "../controllers/sessionController.js";
import { createSessionSchema } from "../utils/validations/createSession.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";

const router = express.Router();

router.post(
  "/",
  validateSchema({ body: createSessionSchema }),
  SessionController.createSession
);

export default router;
