import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils";

const AddQuestion = () => {
  const navigate = useNavigate();

  // Set category/subcategory once
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  // Dynamic list of questions only (no cat/subcat inside)
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    try {
      if (!category || !subcategory) {
        return handleError("Category and Subcategory are required");
      }

      const payload = questions.map((q) => ({
        ...q,
        category,
        subcategory,
      }));

      const res = await fetch("http://localhost:8080/api/questions/bulk-add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ questions: payload }),
      });

      const data = await res.json();
      if (data.success) {
        handleSuccess(data.message);
        setQuestions([{ question: "", answer: "" }]);
        setCategory("");
        setSubcategory("");
      } else {
        handleError(data.message);
      }
    } catch (err) {
      handleError("Failed to save questions");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Add MCQ Questions
      </h2>

      {/* Category and Subcategory filled only once */}
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        placeholder="Subcategory"
        className="w-full mb-6 px-3 py-2 border rounded"
        required
      />

      {/* Multiple Questions */}
      {questions.map((q, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">MCQ Question {index + 1}</h3>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Remove
              </button>
            )}
          </div>

          <input
            type="text"
            value={q.question}
            onChange={(e) => handleChange(index, "question", e.target.value)}
            placeholder="Question"
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            value={q.answer}
            onChange={(e) => handleChange(index, "answer", e.target.value)}
            placeholder="Answer"
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
        </div>
      ))}

      <div className="flex space-x-3">
        <button
          onClick={addQuestion}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Add Question
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Save
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
          ⬅ Home
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
