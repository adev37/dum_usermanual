import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuestionsPage = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();
  const category = propCategory || paramCategory;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Fetch questions from backend
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/questions")
      .then((res) => res.json())
      .then((data) => {
        if (data.questions) {
          // Filter questions based on selected category
          const filteredQuestions = data.questions.filter(
            (q) => q.category === category
          );
          setQuestions(filteredQuestions);
        } else {
          setQuestions([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load questions. Please try again.");
        setLoading(false);
      });
  }, [category]); // Re-fetch when category changes

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold shadow-md">
        {category} Questions
      </header>

      {/* Questions Panel */}
      <div className="flex-1 p-6 max-h-[78vh] overflow-y-auto bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">{category} Questions</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading questions...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="p-4 bg-gray-100 shadow-md rounded-md">
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
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No questions available.</p>
        )}
      </div>

      {/* Back Button (Only on Mobile) */}
      {isMobile && (
        <button
          className="m-4 px-4 py-2 bg-gray-300 rounded-md text-black hover:bg-gray-400 transition-all duration-200"
          onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      )}
    </div>
  );
};

export default QuestionsPage;
