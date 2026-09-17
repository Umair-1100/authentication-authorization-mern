import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import authRoutes from "./routes/auth.routes.js";
import pageRoutes from "./routes/page.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", pageRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
