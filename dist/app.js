import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./app/routes/routes.js";
import { globalErrorHandler } from "./app/utils/errorHandler.js";
const app = express();
const corsOptions = {
    origin: [
        "https://mailforge-bay.vercel.app",
        "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// FIXED: was app.options("*") — * breaks path-to-regexp on Vercel
app.options("/(.*)", cors(corsOptions));
app.use("/api/v1", routes);
app.get("/", (req, res) => {
    res.send("Mailforge connect server side is running.");
});
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map