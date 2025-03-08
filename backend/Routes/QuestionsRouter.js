const express = require("express");
const QuestionModel = require("../Models/Question");

const router = express.Router();

// 🔹 API to Insert a Question
router.post("/add", async (req, res) => {
  try {
    const { category, question, options, answer } = req.body;

    // Validate all fields
    if (!category || !question || !options || !answer) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Create and save question in MongoDB
    const newQuestion = new QuestionModel({
      category,
      question,
      options,
      answer,
    });
    await newQuestion.save();

    res
      .status(201)
      .json({ message: "Question added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

// 🔹 API to Fetch Questions
router.get("/", async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    res.status(200).json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

module.exports = router;
