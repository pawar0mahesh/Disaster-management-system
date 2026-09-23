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

app.use(helmet());
app.use(morgan("common"));

app.use(cors({
  origin: "http://localhost:5173", // or 5173 if that's your frontend port
  credentials: true,
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use("/api/reports", reportRoutes);
app.use("/api/resources", resourceRoutes);


app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));




const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://172.16.13.40:${PORT}`);
});
