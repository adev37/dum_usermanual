import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Required for proper styling

import Home from "./pages/Home";
import QuestionBank from "./components/QuestionBank";
import QuestionsPage from "./components/QuestionsPage";
import Login from "./pages/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/NotFound";
import AddQuestion from "./components/AddQuestion";
import UserDetails from "./components/UserDetails";

// ✅ Custom Auth Hook
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    setIsAuthenticated(!!token);
    setUserRole(role);
    setLoading(false); // Important to prevent flashing 404
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated,
    handleLogout,
    userRole,
    loading,
  };
};

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    handleLogout,
    userRole,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-blue-500 text-lg animate-pulse">Loading app...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute
                element={
                  <Home handleLogout={handleLogout} userRole={userRole} />
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/questions/:category"
            element={
              <PrivateRoute
                element={<QuestionsPage userRole={userRole} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/questions/:main" element={<QuestionsPage />} />
          <Route path="/questions/:main/:sub" element={<QuestionsPage />} />
          <Route
            path="/question-bank"
            element={
              <PrivateRoute
                element={<QuestionBank userRole={userRole} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route
            path="/userDetails"
            element={
              <PrivateRoute
                element={<UserDetails />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* ✅ Admin-Only Route for Add */}
          <Route
            path="/add"
            element={
              userRole === "admin" ? (
                <PrivateRoute
                  element={<AddQuestion />}
                  isAuthenticated={isAuthenticated}
                />
              ) : (
                <NotFound />
              )
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
