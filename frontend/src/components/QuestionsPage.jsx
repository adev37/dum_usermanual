import React, { useState, useEffect } from "react";
import otTableImage1 from "../assets/Bez-nazwy.png";
import otTableImage2 from "../assets/bez-ta.png";
import otTableImage3 from "../assets/hyperion.png";
import { handleSuccess, handleError } from "../utils";

const QuestionsPage = ({ category, subcategory, userRole }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/questions");
        const data = await res.json();
        if (data.success) {
          setQuestions(data.questions);
        }
      } catch (err) {
        handleError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const normalize = (text = "") =>
    text
      .replace(/^\d+\.\s*/, "")
      .trim()
      .toLowerCase();

  const filtered = questions.filter(
    (q) =>
      normalize(q.category) === normalize(category) &&
      normalize(q.subcategory) === normalize(subcategory)
  );

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/questions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (result.success) {
        handleSuccess(result.message);
        setQuestions((prev) => prev.filter((q) => q._id !== id));
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError("Failed to delete question");
    }
  };

  const handleEdit = async (id) => {
    const updatedAnswer = prompt("Enter updated answer:");
    if (!updatedAnswer) return;

    try {
      const res = await fetch(`http://localhost:8080/api/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ answer: updatedAnswer }),
      });
      const result = await res.json();
      if (result.success) {
        handleSuccess(result.message);
        setQuestions((prev) =>
          prev.map((q) => (q._id === id ? { ...q, answer: updatedAnswer } : q))
        );
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError("Failed to update answer");
    }
  };

  return (
    <div className="w-full">
      {subcategory && filtered.length > 0 && (
        <ul className="space-y-4 mt-4">
          {filtered.map((item, index) => (
            <li
              key={item._id || index}
              className="bg-white p-4 rounded shadow text-sm md:text-base">
              <p className="font-medium">
                {index + 1}. Q: {item.question}
              </p>
              <p className="text-green-700 mt-1">A: {item.answer}</p>
              {userRole === "admin" && (
                <div className="mt-2 flex space-x-4 text-sm">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(item._id)}>
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {subcategory && filtered.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-4">
          No questions available for this subcategory.
        </p>
      )}

      {!subcategory && !isMobile && (
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <img
              src={otTableImage1}
              alt="OT Table 1"
              className="w-48 h-auto max-h-48 object-contain rounded shadow"
            />
            <img
              src={otTableImage3}
              alt="OT Table 3"
              className="w-48 h-auto max-h-48 object-contain rounded shadow"
            />
          </div>
          <img
            src={otTableImage2}
            alt="OT Table 2"
            className="w-48 h-auto max-h-48 object-contain rounded shadow"
          />
          <p className="text-center text-gray-600 max-w-2xl mt-4">
            Explore key aspects of Operating Table usage. Click a topic from the
            menu to begin learning installation, operation, positioning, safety,
            and maintenance procedures.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
