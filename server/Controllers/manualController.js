import Manual from "../Models/Manual.js";

export const getAllManuals = async (req, res) => {
  try {
    const manuals = await Manual.find().sort({ uploadedAt: -1 });
    res.json(manuals);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch manuals", success: false });
  }
};

export const getManualById = async (req, res) => {
  try {
    const manual = await Manual.findById(req.params.id);
    if (!manual) return res.status(404).json({ message: "Manual not found" });
    res.json(manual);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch manual" });
  }
};

// manualController.js
export const uploadManual = async (req, res) => {
  try {
    const { title, model, category, description } = req.body;
    const pdfFile = req.files?.pdf?.[0];
    const imageFile = req.files?.image?.[0];

    if (!pdfFile || !imageFile) {
      return res.status(400).json({ message: "Missing PDF or image file." });
    }

    const newManual = new Manual({
      title,
      model,
      category,
      description,
      file: `/manuals/${pdfFile.filename}`,
      image: `/manuals/${imageFile.filename}`,
      uploadedAt: new Date(),
    });

    await newManual.save();
    res.status(201).json(newManual);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", success: false });
  }
};
