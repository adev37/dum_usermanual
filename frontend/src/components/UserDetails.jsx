// src/components/UserDetails.js
import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaBriefcase } from "react-icons/fa";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar

const UserDetails = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "https://dum-digital-user-manual.vercel.app/auth/userDetail",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUser({
            name: data.user.name,
            email: data.user.email,
            role: data.user.role || "Student",
          });
        } else {
          setError(data.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Server error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <p className="text-blue-700 text-lg">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-gray-200">
      {/* ✅ Sidebar visible on both mobile & desktop */}
      <Sidebar
        activeTab="profile"
        setActiveTab={() => {}}
        onLogoutClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.href = "/login";
        }}
        userRole={user.role}
      />

      <main className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            User Profile
          </h2>

          <div className="space-y-4">
            {[
              { label: "Full Name", value: user.name, icon: <FaUser /> },
              { label: "Email", value: user.email, icon: <FaEnvelope /> },
              { label: "Profession", value: user.role, icon: <FaBriefcase /> },
            ].map((field, index) => (
              <div
                key={index}
                className="flex items-center border rounded-lg p-3 shadow-sm bg-gray-100">
                <span className="text-blue-500 text-lg mx-2">{field.icon}</span>
                <input
                  type="text"
                  value={field.value}
                  readOnly
                  className="w-full bg-transparent outline-none text-gray-700"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetails;
