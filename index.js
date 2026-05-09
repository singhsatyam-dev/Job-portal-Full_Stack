import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/auth.routes.js"
import jobRouter from "./routes/job.routes.js"

import connectDB from "./config/db.js"

dotenv.config();

const app = express()

const PORT = process.env.PORT || 3000

//db connection
connectDB()
app.use(cors())

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// ROUTES
app.use("/api/auth", router);
app.use("/api/jobs", jobRouter);

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