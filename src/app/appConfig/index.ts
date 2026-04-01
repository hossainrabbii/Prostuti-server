import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  accessTokenLimit: process.env.ACCESS_TOKEN_LIMIT as string,

  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  refreshTokenLimit: process.env.REFRESH_TOKEN_LIMIT as string,

  enail_user: process.env.EMAIL_USER,
  enail_pass: process.env.EMAIL_PASS,

  node_env: process.env.node_env,
};
