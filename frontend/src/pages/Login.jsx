import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import otTableImage from "../assets/bez-ta.png"; // Update with your OT image path

const Login = ({ setIsAuthenticated }) => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password)
      return handleError("Email and password are required");

    try {
      const response = await fetch(
        "https://dum-digital-user-manual.vercel.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfo),
        }
      );

      const result = await response.json();
      const { success, message, jwtToken, name, role, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("role", role);
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
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                value={loginInfo.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={loginInfo.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit */}
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
