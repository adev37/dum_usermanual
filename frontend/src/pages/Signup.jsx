import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";
// import { Viewer } from "@react-pdf-viewer/core";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = signupInfo;

    if (!name || !email || !password || !role) {
      return handleError("Name, email, password, and role are required");
    }

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(
          error?.details?.[0]?.message || message || "An error occurred"
        );
      }
    } catch (error) {
      handleError(error.message || "Error during signup");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl border">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignup}>
          {/* Input fields */}
          {[
            {
              label: "Name",
              type: "text",
              name: "name",
              placeholder: "Enter your name",
            },
            {
              label: "Email Address",
              type: "email",
              name: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Password",
              type: "password",
              name: "password",
              placeholder: "Enter your password",
            },
          ].map(({ label, type, name, placeholder }) => (
            <div className="mb-4" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={signupInfo[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Role dropdown */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={signupInfo.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="user">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition">
            Sign Up
          </button>
        </form>

        {/* Link to login */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline">
            Log in here
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
