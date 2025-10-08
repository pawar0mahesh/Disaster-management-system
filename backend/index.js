import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";




import reportRoutes from "./routes/reportRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";



dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
// app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use(cors({
  origin: "http://localhost:5173", // or 5173 if that's your frontend port
  credentials: true,
}));

// Get current directory (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Use routes
app.use("/api/reports", reportRoutes);
app.use("/api/resources", resourceRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));






// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
