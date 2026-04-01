import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes/routes.js";

const app: Application = express();

// parsers
app.use(express.json());
// app.use(cors({ origin: "https://hossainrabbi.vercel.app", credentials: true }));
app.use(cors());
app.use("/api/v1", routes);
//

app.get("/", (req: Request, res: Response) => {
  res.send("Mailforge connect server side is running.");
});

export default app;
