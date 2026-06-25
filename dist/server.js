import app from "./app.js";
import appConfig from "./app/appConfig/index.js";
import mongoose from "mongoose";
let isConnected = false;
async function connectDB() {
    if (isConnected)
        return;
    await mongoose.connect(appConfig.mongodb_url);
    isConnected = true;
}
export default async function handler(req, res) {
    try {
        await connectDB();
        return app(req, res);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            error
        });
    }
}
//# sourceMappingURL=server.js.map