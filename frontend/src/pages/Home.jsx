import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "questionbank") {
      navigate("/question-bank"); // Redirect only when "Question Bank" is clicked
    }
  }, [activeTab, navigate]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-lg p-4 md:relative flex flex-col md:h-screen">
        <div className="flex items-center space-x-2 pb-4 border-b">
          <img
            src={logo}
            alt="Logo"
            className="h-12 md:h-16 lg:h-20 xl:h-24 w-auto"
          />
        </div>
        <nav className="mt-4 flex-1">
          <button
            className={`w-full text-left p-3 rounded-lg mb-2 font-medium flex items-center space-x-2 transition-all duration-300 ${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "bg-blue-300 text-black hover:bg-blue-400"
            }`}
            onClick={() => setActiveTab("dashboard")}>
            <span>📊</span>
            <span>Dashboard</span>
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg mb-2 font-medium flex items-center space-x-2 transition-all duration-300 ${
              activeTab === "questionbank"
                ? "bg-blue-500 text-white"
                : "bg-blue-300 text-black hover:bg-blue-400"
            }`}
            onClick={() => setActiveTab("questionbank")}>
            <span>📚</span>
            <span>Question Bank</span>
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg mb-2 font-medium flex items-center space-x-2 transition-all duration-300 ${
              activeTab === "logout"
                ? "bg-red-500 text-white"
                : "bg-red-300 text-black hover:bg-red-400"
            }`}
            onClick={() => setActiveTab("logout")}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-grow items-center md:items-start w-full min-h-screen p-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold mb-4 text-center md:text-left w-full">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>

        {/* Content Area */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-full min-h-[88vh] flex items-center justify-center">
          {activeTab === "dashboard" && <p>Welcome to the Dashboard!</p>}
          {activeTab === "logout" && (
            <p>You have been logged out. Haved a great day!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
