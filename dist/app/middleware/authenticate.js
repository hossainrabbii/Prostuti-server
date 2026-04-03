import jwt from "jsonwebtoken";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const authenticate = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized — please login",
        });
    }
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET);
        req.user = decoded;
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