import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";
import aiVideo from "../assets/video.mp4";

const Login = ({ setIsAuthenticated }) => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, role, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("role", role); // Store user role
        setIsAuthenticated(true);
        setTimeout(() => navigate("/"), 1000);
      } else {
        handleError(
          error?.details?.[0]?.message || message || "An error occurred"
        );
      }
    } catch (error) {
      handleError(error.message || "Error during login");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover">
        <source src={aiVideo} type="video/mp4" />
      </video>
      <div className="relative z-10 w-full max-w-md p-6 bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          Login
        </h3>
        <form onSubmit={handleLogin}>
          {[
            {
              label: "Email address",
              type: "email",
              name: "email",
              placeholder: "Enter email",
            },
            {
              label: "Password",
              type: "password",
              name: "password",
              placeholder: "Enter password",
            },
          ].map(({ label, type, name, placeholder }) => (
            <div className="mb-4" key={name}>
              <label htmlFor={name} className="block text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={loginInfo[name]}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 mt-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-all">
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
