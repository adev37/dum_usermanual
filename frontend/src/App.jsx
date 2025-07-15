// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import ManualUploadPage from "./pages/ManualUploadPage";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewManual from "./pages/ViewManual";

// Layout
import Layout from "./components/layout/Layout";

// Protected routing
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/br/component/signup" element={<Signup />} />

        {/* Protected Routes inside Layout */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
          {/* All routes here require login */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/manual/view/:id" element={<ViewManual />} />
          <Route
            path="/upload"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <ManualUploadPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Catch-all: redirect to login if route not found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
