import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // NEW
import routes from "./app/routes/routes.js";
import { globalErrorHandler } from "./app/utils/errorHandler.js";

const app: Application = express();

app.use(express.json());
app.use(cookieParser()); // NEW: must be before routes
app.use(
  cors({
    origin: ["https://mailforge-bay.vercel.app", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Mailforge connect server side is running.");
});

app.use(globalErrorHandler);

export default app;