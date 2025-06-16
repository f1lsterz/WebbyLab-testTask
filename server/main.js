import express from "express";
import dotenv from "dotenv";
import initializeDatabase from "./src/db/initDatabase.js";
import router from "./src/routes/index.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";

dotenv.config();
await initializeDatabase();

const app = express();

app.use(express.json());
app.use("/api/v1", router);

app.use(errorMiddleware);

const port = process.env.APP_PORT || process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
