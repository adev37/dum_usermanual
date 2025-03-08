import React, { useState } from "react";

const AddQuestion = ({ onQuestionAdded }) => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = { category, question, options, answer };
    const response = await fetch("http://localhost:8080/api/questions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    });

    const data = await response.json();
    if (data.success) {
      onQuestionAdded();
      setCategory("");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-3">Add a New Question</h3>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border mb-2"
        required
      />
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border mb-2"
        required
      />

      {options.map((opt, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="w-full p-2 border mb-2"
          required
        />
      ))}

      <input
        type="text"
        placeholder="Correct Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border mb-2"
        required
      />

      <button type="submit" className="w-full bg-blue-500 text-white p-2">
        Add Question
      </button>
    </form>
  );
};

export default AddQuestion;
