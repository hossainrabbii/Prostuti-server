import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./app/routes/routes.js";
import { globalErrorHandler } from "./app/utils/errorHandler.js";
const app = express();
const corsOptions = {
    // ⚠️ লোকালহোস্টের পাশাপাশি আপনার Vercel ফ্রন্টএন্ডের লাইভ লিংকটি এখানে অবশ্যই যুক্ত করবেন
    origin: ["http://localhost:3000", "https://prostuti-client.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// REMOVED: app.options("*") and app.options("/(.*)")  — both crash path-to-regexp
app.use("/api/v1", routes);
app.get("/", (req, res) => {
    res.send("ShamimVai connect server side is running.");
});
app.use(globalErrorHandler);
export default app;
// 🛠️ Vercel-এর 500/404 "No exports found" এরর ফিক্স করার জন্য এই অংশটি যোগ করা হলো
// @ts-ignore
if (typeof module !== "undefined" && module.exports) {
    // @ts-ignore
    module.exports = app;
}
//# sourceMappingURL=app.js.map