const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true, // <== ✅ THIS WAS MISSING
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    options: {
      type: [String], // for future MCQs (optional)
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
