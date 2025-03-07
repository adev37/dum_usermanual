import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (isMobile) {
      navigate(`/questions/${category}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold shadow-md">
        Medical Question Bank
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar (Categories) */}
        <div className="w-full md:w-1/4 bg-white shadow-md flex flex-col h-full">
          {/* Fixed Heading */}
          <h3 className="text-lg font-semibold text-center p-4 border-b bg-gray-200 flex-none">
            Categories
          </h3>

          {/* Scrollable Category List */}
          <div className="flex-1 overflow-y-auto">
            <ul className="p-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-3 text-gray-700 hover:bg-blue-200 ${
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
        </div>

        {/* Questions Panel - Only Show on Desktop */}
        {!isMobile && (
          <div className="flex-1 p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedCategory} Questions
            </h2>
            <p className="text-center text-gray-500">No questions available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
