import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
  getMe,
  verifyOTP, // NEW
  resendOTP, // NEW
} from "./auth.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP); // NEW
router.post("/resend-otp", resendOTP); // NEW
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

export const authRouter = router;