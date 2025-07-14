import mongoose from "mongoose";

const manualSchema = new mongoose.Schema({
  title: { type: String, required: true },
  model: { type: String, required: true },
  category: { type: String, required: true },
  file: { type: String, required: true },
  description: { type: String, required: true }, // ✅ NEW
  image: { type: String, required: true }, // ✅ NEW (e.g., "/manuals/image.png")
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Manual", manualSchema);
