import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuestionsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold shadow-md">
        {category} Questions
      </header>

      {/* Back Button */}
      <button
        className="m-4 px-4 py-2 bg-gray-300 rounded-md text-black hover:bg-gray-400"
        onClick={() => navigate(-1)}>
        Back
      </button>

      {/* Questions Panel */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{category} Questions</h2>
        <p className="text-center text-gray-500">No questions available.</p>
      </div>
    </div>
  );
};

export default QuestionsPage;
