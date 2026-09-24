import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import authRoutes from "./routes/auth.routes.js";
import pageRoutes from "./routes/page.routes.js";

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", pageRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
