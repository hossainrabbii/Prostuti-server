import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
  getMe,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
  resendResetOTP,
  saveMailConfig,
  getMailConfig,
} from "./user.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-reset-otp", resendResetOTP);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);
router.post("/mail-config", authenticate, saveMailConfig); // NEW
router.get("/mail-config", authenticate, getMailConfig);   // NEW

export const authRouter = router;