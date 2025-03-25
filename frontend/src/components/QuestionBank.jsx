import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionsPage from "./QuestionsPage";

const structuredCategories = [
  {
    main: "1. Setup & Installation",
    subs: [
      "Unpacking the Operating Table",
      "Inspecting the OT Table",
      "Preparing for Installation",
      "Connecting to Power",
      "Testing the Table After Setup",
      "Accessory Setup",
    ],
  },
  {
    main: "2. Operating the Table",
    subs: [
      "Overview of Operation Controls",
      "Buttons on the Remote Control",
      "Safety Features of the Remote Control",
      "Switches on the Table",
      "Manual Controls",
      "Column-Mounted Controls",
      "Testing Remote Control Functions",
      "Troubleshooting Remote Controls",
      "Advanced Features of the Remote",
      "Maintenance of Remote Controls",
      "Testing and Calibration",
      "Advanced Remote Features",
      "User Training and Best Practices",
      "Final Checks and Calibration",
    ],
  },
  {
    main: "3. Table Positioning & Adjustments",
    subs: [
      "Height Adjustments",
      "Trendelenburg & Reverse-Trendelenburg",
      "Lateral Tilt Adjustments",
      "Longitudinal Shift Adjustments",
      "Headrest and Footrest Adjustments",
      "Combined Adjustments",
      "Testing Advanced Adjustments",
      "Troubleshooting Position-Related Issues",
      "Adjusting Specific Table Components",
      "Safety Precautions During Adjustments",
      "Maintenance of Adjustment Features",
      "Advanced Positioning Features",
      "Emergency Adjustment Procedures",
    ],
  },
  {
    main: "4. Accessory Usage & Handling",
    subs: [
      "General Overview of Accessories",
      "Attaching Accessories",
      "Adjusting Attached Accessories",
      "Removing Accessories",
      "Compatibility of Accessories",
      "Maintenance of Accessories",
      "Specialized Accessories",
      "Accessory Placement",
      "Troubleshooting Accessory Issues",
      "Safety Precautions",
      "Specific Accessory Types",
      "Advanced Usage Scenarios",
      "Troubleshooting and Emergency Procedures",
      "Maintenance and Storage",
      "Accessory Usage Safety",
      "Advanced Accessories",
      "Emergency Preparedness",
    ],
  },
  {
    main: "5. Safety, Cleaning & Disinfection",
    subs: [
      "Disinfection and Cleaning Procedures",
      "Routine Cleaning Schedule",
      "Cleaning Different Components",
      "Safety Checks",
      "Routine Safety Inspection",
      "Troubleshooting Common Issues",
      "Emergency Procedures",
      "Long-Term Maintenance for Safety",
      "Training and Best Practices",
      "Advanced Cleaning Techniques",
      "Emergency Troubleshooting",
      "Emergency Procedures (Advanced)",
      "Long-Term Safety Maintenance",
      "Advanced Safety Techniques",
      "Training and Documentation",
      "Ensuring Longevity",
    ],
  },
  {
    main: "6. Maintenance & Repairs",
    subs: [
      "Routine Maintenance Checks",
      "Cleaning as Part of Maintenance",
      "Inspecting Moving Parts",
      "Battery and Power System Maintenance",
      "Hydraulic System Maintenance",
      "Repairs for Minor Issues",
      "Emergency Repairs",
      "Long-Term Maintenance",
      "Documentation and Logs",
      "Advanced Troubleshooting",
      "Specific Repair Scenarios",
      "Testing After Repairs",
      "Preventive Maintenance",
      "Emergency Preparedness",
      "Advanced Repairs",
      "Long-Term Maintenance Strategies",
      "Training and Documentation",
      "Future-Proofing the Equipment",
      "Proactive Measures",
    ],
  },
];

const QuestionBank = () => {
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSub, setSelectedSub] = useState("");
  const [expandedMain, setExpandedMain] = useState(
    structuredCategories[0].main
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && location.pathname.startsWith("/questions/")) {
        navigate("/question-bank", { replace: true });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname, navigate]);

  const handleMainClick = useCallback(
    (main) => {
      setExpandedMain(expandedMain === main ? null : main);
      setSelectedMain(main);
      setSelectedSub("");
      if (isMobile) navigate(`/questions/${main}`);
    },
    [expandedMain, isMobile, navigate]
  );

  const handleSubClick = useCallback(
    (main, sub) => {
      setSelectedMain(main);
      setSelectedSub(sub);
      if (isMobile) navigate(`/questions/${main}/${sub}`);
    },
    [isMobile, navigate]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold shadow-md">
        DUM (Digital User Manual)
      </header>

      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        <aside className="w-full md:w-1/4 bg-white shadow-md flex flex-col h-full">
          <h3 className="text-lg font-semibold text-center p-4 border-b bg-gray-200">
            Categories
          </h3>
          <div className="flex-1 overflow-y-auto">
            <ul className="p-2">
              {structuredCategories.map(({ main, subs }) => (
                <React.Fragment key={main}>
                  <li
                    className={`cursor-pointer p-3 font-semibold text-gray-800 hover:bg-blue-200 transition-all duration-200 ${
                      selectedMain === main && !selectedSub
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleMainClick(main)}>
                    {main}
                  </li>
                  {expandedMain === main && (
                    <>
                      {subs.map((sub, index) => (
                        <li
                          key={index}
                          className={`cursor-pointer pl-6 py-2 text-gray-700 hover:bg-blue-100 ${
                            selectedSub === sub
                              ? "text-blue-600 font-semibold"
                              : ""
                          }`}
                          onClick={() => handleSubClick(main, sub)}>
                          - {sub}
                        </li>
                      ))}
                    </>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <button
            className="m-4 p-2 bg-gray-300 rounded-md text-black hover:bg-gray-400 transition-all duration-200"
            onClick={() => navigate("/")}>
            ⬅ Go Back to Home
          </button>
        </aside>

        {!isMobile && (
          <main className="flex-1 p-6 overflow-y-auto">
            {selectedMain && (
              <>
                {selectedSub && (
                  <>
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedMain} Questions
                    </h2>
                    <h3 className="text-lg font-semibold mb-4">
                      - {selectedSub} Questions
                    </h3>
                  </>
                )}
                {!selectedSub && (
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedMain} Questions
                  </h2>
                )}
                <QuestionsPage
                  category={selectedMain}
                  subcategory={selectedSub}
                />
              </>
            )}
          </main>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
