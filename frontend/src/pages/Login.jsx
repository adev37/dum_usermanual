import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

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
      const response = await fetch(
        "https://dum-usermanual.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

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
    <div className="min-h-screen bg-gradient-to-tr from-[#e8f0fc] to-[#c6dbf7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#1f4db6] mb-8">
          Sign In to Continue
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginInfo.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#1f4db6] hover:bg-[#163a92] text-white font-semibold rounded-md transition duration-200 shadow-md">
            LOGIN
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} VT Digital Manual System
        </p>
      </div>
    </div>
  );
};

export default Login;
