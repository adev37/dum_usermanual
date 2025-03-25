// ✅ Final Working QuestionsPage.jsx (Mobile shows expandable categories, desktop shows images and intro only)
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import otTableImage1 from "../assets/Bez-nazwy.png";
import otTableImage2 from "../assets/bez-ta.png";
import otTableImage3 from "../assets/hyperion.png";

const staticQuestions = {
  "1. Setup & Installation": {
    "Unpacking the Operating Table": [
      {
        q: "What is the first step upon receiving the operating table?",
        a: "Inspect the packaging for visible damage during transit.",
      },
      {
        q: "Why is it important to inspect the packaging before unpacking?",
        a: "To ensure no damage occurred during shipping and document any issues for claims.",
      },
    ],
    "Inspecting the OT Table": [],
    "Preparing for Installation": [],
    "Connecting to Power": [],
    "Testing the Table After Setup": [],
    "Accessory Setup": [],
  },
  "2. Operating the Table": {
    "Switching On/Off": [],
    "Emergency Stop": [],
  },
  "3. Table Positioning & Adjustments": {},
  "4. Accessory Usage & Handling": {},
  "5. Safety, Cleaning & Disinfection": {},
  "6. Maintenance & Repairs": {},
};

const QuestionsPage = ({ category: propCategory, subcategory: propSub }) => {
  const { main, sub } = useParams();
  const navigate = useNavigate();

  const decodedMain = decodeURIComponent(main || "");
  const decodedSub = decodeURIComponent(sub || "");

  const category = propCategory ?? decodedMain;
  const subcategory = propSub ?? decodedSub;
  const data = staticQuestions?.[category]?.[subcategory] || [];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (cat) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat));
  };

  const handleSubClick = (mainCat, subCat) => {
    navigate(
      `/question-bank/${encodeURIComponent(mainCat)}/${encodeURIComponent(
        subCat
      )}`
    );
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {isMobile && (
        <header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold shadow-md">
          DUM (Digital User Manual)
        </header>
      )}

      <div className="flex-1 p-4 overflow-y-auto">
        {isMobile && category && subcategory && (
          <>
            <h2 className="text-xl font-bold mb-2 text-center">
              {category} Questions
            </h2>
            <h3 className="text-lg font-semibold mb-4 text-center">
              - {subcategory} Questions
            </h3>
          </>
        )}

        {subcategory && data.length > 0 && (
          <ul className="space-y-4 mt-4">
            {data.map((item, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded shadow text-sm md:text-base">
                <p className="font-medium">
                  {index + 1}. Q: {item.q}
                </p>
                <p className="text-green-700 mt-1">A: {item.a}</p>
              </li>
            ))}
          </ul>
        )}

        {subcategory && data.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No questions available for this subcategory.
          </p>
        )}

        {/* Expandable Category Tree - only for mobile */}
        {!subcategory && isMobile && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Categories
            </h2>
            <div className="bg-white rounded shadow p-4 max-w-md mx-auto">
              {Object.entries(staticQuestions).map(
                ([mainCat, subCats], index) => (
                  <div key={index} className="mb-2">
                    <div
                      onClick={() => toggleCategory(mainCat)}
                      className="font-bold cursor-pointer hover:text-blue-600">
                      {index + 1}. {mainCat}
                    </div>
                    {expandedCategory === mainCat && (
                      <div className="pl-4">
                        {Object.keys(subCats).length > 0 ? (
                          Object.keys(subCats).map((sub, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSubClick(mainCat, sub)}
                              className="cursor-pointer hover:underline text-sm mt-1">
                              - {sub}
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500 text-sm pl-2 mt-1">
                            No subtopics yet
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              )}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200">
                  ⬅ Go Back to Home
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop landing view with images and intro */}
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
              Explore key aspects of Operating Table usage. Click a topic from
              the menu to begin learning installation, operation, positioning,
              safety, and maintenance procedures.
            </p>
          </div>
        )}

        {isMobile && subcategory && (
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
