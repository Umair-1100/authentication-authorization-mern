import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
  resendVerificationEmail,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
