import jwt from "jsonwebtoken";
import appConfig from "../appConfig/index.js";
const ACCESS_SECRET = appConfig.accessTokenSecret;
export const authenticate = (req, res, next) => {
    const token = req.cookies?.accessToken;
    // if (token) console.log(token);
    // console.log(req.cookies);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized — please login",
        });
    }
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET);
        console.log(decoded);
        req.user = decoded;
        console.log(req.user);
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token — please login again",
        });
    }
};
// NEW: separate middleware to check admin role
export const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Forbidden — admin access only",
        });
    }
    next();
};
//# sourceMappingURL=authenticate.js.map