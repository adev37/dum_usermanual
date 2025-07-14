import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Local imports
import connectDB from "./config/db.js";
import ManualRoutes from "./Routes/manualRoutes.js";
import AuthRouter from "./Routes/AuthRouter.js"; // Optional, if you're using auth

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Handles JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Handles form data

// Static file serving for uploaded manuals (PDFs and images)
app.use("/manuals", express.static(join(__dirname, "public/uploads")));

// API routes
app.use("/auth", AuthRouter); // Optional
app.use("/api/manuals", ManualRoutes); // All manuals CRUD/API

// Health check or root
app.get("/", (req, res) => {
  res.send("📘 VT Manual Server is Running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
