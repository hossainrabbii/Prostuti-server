import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes/routes.js";
import { globalErrorHandler } from "./app/utils/errorHandler.js";

const app: Application = express();

// parsers
app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors({ origin: "https://mailforge-bay.vercel.app", credentials: true }));
// app.use(cors());
app.use("/api/v1", routes);
//

app.get("/", (req: Request, res: Response) => {
  res.send("Mailforge connect server side is running.");
});

app.use(globalErrorHandler);

export default app;
