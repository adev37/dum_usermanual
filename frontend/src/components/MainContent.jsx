import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaFileAlt } from "react-icons/fa";
import dashboardLogo from "../assets/logo.png";
import UserDetails from "./UserDetails";
import EditProfile from "./EditProfile";

const MainContent = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  if (activeTab === "profile") {
    return <UserDetails />;
  }

  if (activeTab === "editprofile") {
    return <EditProfile />;
  }

  // Dashboard (default)
  return (
    <main className="flex flex-col items-center justify-center p-6 min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-3xl flex flex-col items-center">
        <img src={dashboardLogo} alt="Logo" className="w-20 h-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">
          Explore a Vast Collection of Questions
        </h2>
        <p className="text-gray-600 mt-2">
          Access a comprehensive question bank tailored for learning and
          revision.
        </p>
      </div>

      {/* Dashboard Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full max-w-3xl">
        <button
          onClick={() => navigate("/question-bank")}
          className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 w-full">
          <div className="text-4xl text-blue-500 mb-2">
            <FaFileAlt />
          </div>
          <span className="text-lg font-medium text-gray-800">
            View Questions
          </span>
        </button>

        <button
          onClick={() => setActiveTab("editprofile")}
          className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 w-full">
          <div className="text-4xl text-blue-500 mb-2">
            <FaUserEdit />
          </div>
          <span className="text-lg font-medium text-gray-800">
            Edit Profile
          </span>
        </button>
      </div>
    </main>
  );
};

export default MainContent;
