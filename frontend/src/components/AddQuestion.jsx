import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [questions, setQuestions] = useState([createEmptyQuestion()]);
  const navigate = useNavigate();

  function createEmptyQuestion() {
    return {
      category: "",
      question: "",
      options: ["", "", "", ""],
      answer: "",
    };
  }

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answer = value;
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([...questions, createEmptyQuestion()]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/api/questions/bulk-add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ questions }),
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("Questions added successfully!");
        setQuestions([createEmptyQuestion()]);
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add MCQ Questions</h2>

      {questions.map((q, index) => (
        <div key={index} className="mb-8 border-b pb-4 relative">
          <h4 className="text-lg font-semibold mb-2">
            MCQ Question {index + 1}
          </h4>
          <button
            type="button"
            onClick={() => removeQuestion(index)}
            className="absolute right-0 top-0 bg-red-500 text-white px-3 py-1 rounded-md text-sm">
            Remove
          </button>

          <input
            type="text"
            placeholder="Category"
            value={q.category}
            onChange={(e) => handleChange(index, "category", e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
            required
          />

          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleChange(index, "question", e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
            required
          />

          {q.options.map((opt, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) =>
                handleOptionChange(index, optIndex, e.target.value)
              }
              className="w-full p-2 border rounded-md mb-2"
              required
            />
          ))}

          <select
            value={q.answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full p-2 border rounded-md"
            required>
            <option value="" disabled>
              Select Correct Answer
            </option>
            {q.options
              .filter((opt) => opt.trim() !== "")
              .map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        </div>
      ))}

      {/* ✅ BUTTONS */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <button
          type="button"
          onClick={addNewQuestion}
          className="bg-purple-500 text-white px-4 py-2 rounded-md">
          Add Question
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md">
          Save
        </button>

        {/* ✅ Back to Home Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 inline-flex items-center space-x-2 text-sm">
          <span className="text-blue-600">⬅</span>
          <span>Home</span>
        </button>
      </div>
    </form>
  );
};

export default AddQuestion;
