import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";
import otTableImage from "../assets/bez-ta.png"; // Make sure your OT image is saved as 'image.png'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-600 p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* Image Side */}
        <div className="md:w-1/2 bg-blue-100 flex items-center justify-center p-6">
          <img
            src={otTableImage}
            alt="OT Table"
            className="object-contain w-full h-auto max-h-96"
          />
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
            Welcome Back
          </h2>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  value={loginInfo[name]}
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-2 mt-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-all">
              LOGIN
            </button>
          </form>
        </div>
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
