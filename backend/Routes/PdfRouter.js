const express = require("express");
const multer = require("multer");
const { uploadPdf, getPdf } = require("../Controllers/PdfController");

const router = express.Router();

// Multer setup for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("pdf"), uploadPdf);
router.get("/:id", getPdf);

module.exports = router;
