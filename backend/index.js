const express = require("express");
require("dotenv").config();
require("./Models/db");
const AuthRouter = require("./Routes/AuthRouter");
const QuestionsRouter = require("./Routes/QuestionsRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Base route
app.get("/", (req, res) => {
  res.send("VTQuestion Bank API is running...");
});

// Authentication Routes
app.use("/auth", AuthRouter);

// Questions Routes
app.use("/api/questions", QuestionsRouter);

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
