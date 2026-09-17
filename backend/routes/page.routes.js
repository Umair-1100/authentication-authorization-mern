import express from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/about", (req, res) => {
  res.status(200).json({ success: true, message: "About Us Page Content" });
});

router.get("/services", (req, res) => {
  res.status(200).json({ success: true, message: "Services Page Content" });
});

router.get("/", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to Home Page, ${req.user.name}`,
    user: req.user,
  });
});

router.get("/admin-settings", protect, restrictTo("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Admin Settings Page",
  });
});

export default router;