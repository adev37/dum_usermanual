// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
// import DeviceManualPage from "./pages/DeviceManualPage";
import ManualUploadPage from "./pages/ManualUploadPage";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewManual from "./pages/ViewManual";

// Layout
import Layout from "./components/layout/Layout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          {/* <Route path="/" element={<DeviceManualPage />} /> */}
          <Route path="/upload" element={<ManualUploadPage />} />
          <Route path="/manual/view/:id" element={<ViewManual />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
