import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionBank from "./components/QuestionBank";
import QuestionsPage from "./components/QuestionsPage";
import Login from "./pages/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/NotFound.jsx";
import AddQuestion from "./components/AddQuestion.jsx";

// Custom Hook for Authentication
// Encapsulates authentication logic for better separation of concerns
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  // Logout function to clear token and update state
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, setIsAuthenticated, handleLogout };
};

const App = () => {
  // Using the custom authentication hook
  const { isAuthenticated, setIsAuthenticated, handleLogout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes, accessible only if authenticated */}
          <Route
            path="/"
            element={
              <PrivateRoute
                element={<Home handleLogout={handleLogout} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/questions/:category"
            element={
              <PrivateRoute
                element={<QuestionsPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/question-bank"
            element={
              <PrivateRoute
                element={<QuestionBank />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute
                element={<AddQuestion />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
