import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuestionsPage from "./QuestionsPage"; // Import QuestionsPage component

const categories = [
  "Human Anatomy",
  "Human Physiology",
  "Biochemistry",
  "Pathology",
  "Microbiology",
  "Pharmacology",
  "Forensic Medicine",
  "Community Medicine",
  "General Medicine",
  "Pediatrics",
  "Dermatology",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Orthopedics",
  "Ophthalmology",
  "Otorhinolaryngology (ENT)",
  "Obstetrics",
  "Gynecology",
  "Anesthesiology",
  "Cardiology",
  "Pulmonology",
  "Gastroenterology",
  "Nephrology",
  "Endocrinology",
  "Hematology",
  "Rheumatology",
  "Infectious Diseases",
  "Neurology",
];

const QuestionBank = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryClick = useCallback(
    (category) => {
      setSelectedCategory(category);
      if (isMobile) navigate(`/questions/${category}`);
    },
    [isMobile, navigate]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold shadow-md">
        VT Question Bank
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar (Categories) */}
        <aside className="w-full md:w-1/4 bg-white shadow-md flex flex-col h-full">
          <h3 className="text-lg font-semibold text-center p-4 border-b bg-gray-200 flex-none">
            Categories
          </h3>

          {/* Scrollable Category List */}
          <div className="flex-1 overflow-y-auto">
            <ul className="p-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-3 text-gray-700 hover:bg-blue-200 transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Back to Home Button */}
          <button
            className="m-4 p-2 bg-gray-300 rounded-md text-black hover:bg-gray-400 transition-all duration-200"
            onClick={() => navigate("/")}>
            ⬅ Go Back to Home
          </button>
        </aside>

        {/* Questions Panel - Only Show on Larger Screens */}
        {!isMobile && (
          <main className="flex-1 p-6">
            <QuestionsPage category={selectedCategory} />
          </main>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
