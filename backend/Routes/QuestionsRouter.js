const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/verifyToken");
const QuestionModel = require("../Models/Question");

// ✅ Add Single Question
router.post("/add", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Access denied" });

    const { category, subcategory, question, answer } = req.body;
    if (!category || !subcategory || !question || !answer)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });

    const newQuestion = new QuestionModel({
      category,
      subcategory,
      question,
      answer,
    });
    await newQuestion.save();
    res.json({ success: true, message: "Question added" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Add Bulk Questions
router.post("/bulk-add", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Access denied" });

    const { questions } = req.body;
    if (!Array.isArray(questions) || questions.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Questions array required" });

    const invalid = questions.find(
      (q) => !q.category || !q.subcategory || !q.question || !q.answer
    );
    if (invalid)
      return res.status(400).json({
        success: false,
        message: "All fields required for each question",
      });

    await QuestionModel.insertMany(questions);
    res.json({ success: true, message: "Questions added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get All Questions (Public)
router.get("/", async (req, res) => {
  try {
    const questions = await QuestionModel.find().sort({ createdAt: -1 });
    res.json({ success: true, questions });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Edit Answer
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Access denied" });

    const { answer } = req.body;
    if (!answer)
      return res
        .status(400)
        .json({ success: false, message: "Answer is required" });

    await QuestionModel.findByIdAndUpdate(req.params.id, { answer });
    res.json({ success: true, message: "Answer updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Delete Question
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Access denied" });

    await QuestionModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
