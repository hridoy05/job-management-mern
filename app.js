import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

import { dirname } from "path";
import { fileURLToPath } from "url";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// hello

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import path from "path";
import { handleRequest } from "./middleware/handle-request.js";
//import { errorLogger, infoLogger } from "./logger/logger.js";

// const __dirname = dirname(fileURLToPath(import.meta.url))

// // only when ready to deploy
// app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(handleRequest);
//app.use(infoLogger());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// only when ready to deploy
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
//app.use(errorLogger());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
