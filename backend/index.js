const express = require("express");
require("dotenv").config();
require("./Models/db");
const AuthRouter = require("./Routes/AuthRouter");
const PdfRouter = require("./Routes/PdfRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("hello HSTP");
});
app.use(bodyParser.json());
// Enabling CORS to allow requests from different domains (useful for frontend-backend communication)
app.use(cors());

// Defining the base route for authentication. All routes in AuthRouter will be available under "/auth"
app.use("/auth", AuthRouter);
app.use("/api/pdf", PdfRouter);

// Starting the server and making it listen on the specified PORT. Once the server starts, it will log the port it's running on
app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
