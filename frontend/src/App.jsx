import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionBank from "./components/QuestionBank";
import QuestionsPage from "./components/QuestionsPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions/:category" element={<QuestionsPage />} />
          <Route path="/question-bank" element={<QuestionBank />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-red-600 text-2xl mt-10">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
