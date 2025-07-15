import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import otTableImage from "../assets/Picture1.png";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = loginInfo.email.trim();
    const password = loginInfo.password;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        handleError(result.message || "Login failed");
        setLoginInfo({ ...loginInfo, password: "" });
        return;
      }

      const { jwtToken, name, role } = result;

      handleSuccess(result.message);
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("loggedInUser", name);
      localStorage.setItem("role", role);

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      handleError(error.message || "Server error during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f1fd] to-[#a4cfff] p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Image */}
        <div className="md:w-1/2 bg-[#ddecfc] flex items-center justify-center p-6">
          <img
            src={otTableImage}
            alt="OT Table"
            className="object-contain w-full h-auto max-h-96"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-[#1f4db6] mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm mb-1 text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={loginInfo.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm mb-1 text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={loginInfo.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-2 text-white bg-[#1f4db6] hover:bg-[#153e99] rounded-full font-semibold transition-all shadow-md">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
