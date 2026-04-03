import { Router } from "express";
import { register, login, refresh, logout, getMe } from "./auth.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
const router = Router();
// public
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
// protected
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);
export const authRouter = router;
//# sourceMappingURL=auth.route.js.map