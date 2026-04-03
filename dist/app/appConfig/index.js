import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
    port: process.env.PORT,
    mongodb_url: process.env.MONGODB_URL,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenLimit: process.env.ACCESS_TOKEN_LIMIT,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenLimit: process.env.REFRESH_TOKEN_LIMIT,
    enail_user: process.env.EMAIL_USER,
    enail_pass: process.env.EMAIL_PASS,
    node_env: process.env.node_env,
};
//# sourceMappingURL=index.js.map