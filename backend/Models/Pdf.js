const mongoose = require("mongoose");

const PdfSchema = new mongoose.Schema({
  name: String,
  pdf: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Pdf", PdfSchema);
