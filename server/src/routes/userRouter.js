import express from "express";
import UserController from "../controllers/userController.js";
import { createUserSchema } from "../utils/validations/createUser.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";

const router = express.Router();

router.post(
  "/",
  validateSchema({ body: createUserSchema }),
  UserController.createUser
);

export default router;
