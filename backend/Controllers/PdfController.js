const Pdf = require("../Models/Pdf");
const fs = require("fs");
const path = require("path");

// Upload PDF
exports.uploadPdf = async (req, res) => {
  try {
    const pdfData = fs.readFileSync(
      path.join(__dirname, "../uploads/" + req.file.filename)
    );
    const newPdf = new Pdf({
      name: req.file.originalname,
      pdf: {
        data: pdfData,
        contentType: "application/pdf",
      },
    });
    await newPdf.save();
    res
      .status(201)
      .send({ message: "PDF uploaded successfully", id: newPdf._id });
  } catch (error) {
    res.status(500).send({ message: "Error uploading PDF", error });
  }
};

// Get PDF
exports.getPdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) {
      return res.status(404).send({ message: "PDF not found" });
    }
    res.contentType(pdf.pdf.contentType);
    res.send(pdf.pdf.data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching PDF", error });
  }
};
