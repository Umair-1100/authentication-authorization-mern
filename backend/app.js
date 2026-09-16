import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";

const app = express();


// Middlewares
app.use(express.json());
app.use(cors(corsOptions));


// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});



export default app