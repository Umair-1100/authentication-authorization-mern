import express from "express";
import { loginUser, registerUser, resendVerificationEmail, verifyEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.post("/login", loginUser);

export default router;
