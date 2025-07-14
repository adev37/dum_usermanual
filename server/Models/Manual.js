// models/Manual.js
import mongoose from "mongoose";

const manualSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    file: {
      type: String,
      required: true, // e.g., "/manuals/123456-title-pdf.pdf"
    },
    image: {
      type: String,
      required: true, // e.g., "/manuals/123456-title-image.png"
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Optional: enables createdAt and updatedAt fields automatically
    timestamps: false,
  }
);

export default mongoose.model("Manual", manualSchema);
