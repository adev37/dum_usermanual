import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuestionsPage = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();
  const category = propCategory ?? paramCategory;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editForm, setEditForm] = useState({
    category: "",
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/questions")
      .then((res) => res.json())
      .then((data) => {
        if (data.questions) {
          const filtered = data.questions.filter(
            (q) => q.category.toLowerCase() === category.toLowerCase()
          );
          setQuestions(filtered);
        } else {
          setQuestions([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load questions. Please try again.");
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditClick = (question) => {
    setEditingQuestion(question._id);
    setEditForm({
      category: question.category,
      question: question.question,
      options: question.options,
      answer: question.answer,
    });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updated = [...editForm.options];
    updated[index] = value;
    setEditForm({ ...editForm, options: updated });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/questions/${editingQuestion}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (data.success) {
        setQuestions((prev) =>
          prev.map((q) =>
            q._id === editingQuestion ? { ...q, ...editForm } : q
          )
        );
        setEditingQuestion(null);
      } else {
        alert("Failed to update question.");
      }
    } catch (error) {
      alert("Error updating question. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/questions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setQuestions((prev) => prev.filter((q) => q._id !== id));
      } else {
        alert("Failed to delete question.");
      }
    } catch (error) {
      alert("Error deleting question. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold shadow-md">
        {category} Questions
      </header>

      <div className="flex-1 p-6 max-h-[78vh] overflow-y-auto bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">{category} Questions</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading questions...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q._id} className="p-4 bg-gray-100 shadow-md rounded-md">
                {editingQuestion === q._id ? (
                  <div>
                    <input
                      type="text"
                      name="question"
                      value={editForm.question}
                      onChange={handleChange}
                      className="w-full p-2 border mb-2"
                    />
                    {editForm.options.map((option, i) => (
                      <input
                        key={i}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(i, e.target.value)}
                        className="w-full p-2 border mb-2"
                      />
                    ))}
                    <input
                      type="text"
                      name="answer"
                      value={editForm.answer}
                      onChange={handleChange}
                      className="w-full p-2 border mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-green-500 text-white rounded-md">
                        Save
                      </button>
                      <button
                        onClick={() => setEditingQuestion(null)}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-gray-800">
                      {index + 1}. {q.question}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {q.options.map((option, i) => (
                        <li key={i} className="text-gray-600">
                          ➡ {option}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 font-bold text-green-600">
                      Answer: {q.answer}
                    </p>
                    {userRole === "admin" && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditClick(q)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(q._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md">
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No questions available.</p>
        )}

        {/* Mobile Back Button at the bottom */}
        {isMobile && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/question-bank")}
              className="w-full max-w-sm bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 flex items-center justify-center">
              <span className="text-blue-600 mr-2">⬅</span>
              Go Back to Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
