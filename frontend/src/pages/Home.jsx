import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Home = ({ handleLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "questionbank") {
      navigate("/question-bank");
    } else if (activeTab === "add") {
      navigate("/add");
    }
  }, [activeTab, navigate]);

  const onLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-white shadow-lg p-4 md:relative flex flex-col md:h-screen">
        <div className="flex items-center space-x-2 pb-4 border-b">
          <img
            src={logo}
            alt="Logo"
            className="h-12 md:h-16 lg:h-20 xl:h-24 w-auto"
          />
        </div>
        <nav className="mt-4 flex-1">
          {[
            { name: "dashboard", icon: "📊", label: "Dashboard" },
            { name: "questionbank", icon: "📚", label: "Question Bank" },
            { name: "add", icon: "➕", label: "Add" },
          ].map(({ name, icon, label }) => (
            <button
              key={name}
              className={`w-full text-left p-3 rounded-lg mb-2 font-medium flex items-center space-x-2 transition-all duration-300 ${
                activeTab === name
                  ? "bg-blue-500 text-white"
                  : name === "add"
                  ? "bg-blue-300 text-black hover:bg-blue-400"
                  : "bg-blue-300 text-black hover:bg-blue-400"
              }`}
              onClick={() => setActiveTab(name)}>
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
          <button
            className="w-full text-left p-3 rounded-lg mb-2 font-medium flex items-center space-x-2 transition-all duration-300 bg-red-300 text-black hover:bg-red-400"
            onClick={onLogoutClick}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col lg:flex-grow items-center md:items-start w-full min-h-screen p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center md:text-left w-full">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-full min-h-[88vh] flex items-center justify-center">
          {activeTab === "dashboard" && <p>Welcome to the Dashboard!</p>}
        </div>
      </main>
    </div>
  );
};

export default Home;
