import express from "express";
import cors from "cors";
import routes from "./app/routes/routes.js";
import { globalErrorHandler } from "./app/utils/errorHandler.js";
const app = express();
// parsers
app.use(express.json());
// app.use(cors({ origin: "https://hossainrabbi.vercel.app", credentials: true }));
app.use(cors());
app.use("/api/v1", routes);
//
app.get("/", (req, res) => {
    res.send("Mailforge connect server side is running.");
});
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map