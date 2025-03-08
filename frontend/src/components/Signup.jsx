import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle user signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-cyan-400">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          Sign Up
        </h3>
        <form onSubmit={handleSignup}>
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
              <label htmlFor={name} className="block text-gray-600 mb-1">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo[name]}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 mt-2 text-white bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-all">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline">
              {" "}
              Log In
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
