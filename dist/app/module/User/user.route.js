import { Router } from "express";
import { register, login, refresh, logout, getMe, verifyOTP, // NEW
resendOTP, saveMailConfig, getMailConfig, // NEW
 } from "./user.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP); // NEW
router.post("/resend-otp", resendOTP); // NEW
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);
router.post("/mail-config", authenticate, saveMailConfig); // NEW
router.get("/mail-config", authenticate, getMailConfig); // NEW
export const authRouter = router;
//# sourceMappingURL=user.route.js.map