import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import connectDB from "./config/db.js";
import ManualRoutes from "./Routes/manualRoutes.js";
import AuthRouter from "./Routes/AuthRouter.js"; // Optional

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", AuthRouter); // Optional
app.use("/api/manuals", ManualRoutes);
app.use("/manuals", express.static(join(__dirname, "public/uploads")));

app.get("/", (req, res) => {
  res.send("📘 VT Manual Server is Running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
