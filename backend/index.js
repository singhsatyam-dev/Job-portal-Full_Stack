import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/auth.routes.js";
import jobRouter from "./routes/job.routes.js";
import aiRouter from "./routes/ai.routes.js";

import connectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

//db connection
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);

// Serve uploaded resumes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/api/auth", router);
app.use("/api/jobs", jobRouter);
app.use("/api/ai", aiRouter)

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job Portal API Running",
  });
});

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
