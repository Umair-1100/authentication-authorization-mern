import express from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the Authentication & Auhtorization System." });
});

router.get("/about", (req, res) => {
  res.status(200).json({ success: true, message: "About Us Page Content" });
});

router.get("/services", (req, res) => {
  res.status(200).json({ success: true, message: "Services Page Content" });
});

router.get("/admin-settings", protect, restrictTo("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Admin Settings Page",
  });
});

export default router;