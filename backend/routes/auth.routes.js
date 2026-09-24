import express from "express";
import {
  forgotPassword,
  getMe,
  loginUser,
  registerUser,
  resendOTP,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);


export default router;
