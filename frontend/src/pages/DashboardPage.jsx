// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

const DashboardPage = () => {
  const [manuals, setManuals] = useState([]);

  useEffect(() => {
    axios
      .get("/manuals")
      .then((res) => setManuals(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 pt-20 md:pt-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">
        Learn to Use Our Operating Tables with Ease
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Step-by-step digital user manual (DUM) for each table to help you
        operate safely and efficiently.
      </p>

      {/* Grid: 1 col (mobile) → 2 cols (tablet ≥768px) → 3 cols (desktop ≥1280px) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {manuals.map((manual, idx) => (
          <Link
            key={idx}
            to={`/manual/view/${manual._id}`}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition block hover:bg-gray-50">
            <img
              src={`http://localhost:8080${manual.image}`}
              alt={manual.title}
              className="h-40 mx-auto mb-4 object-contain"
            />
            <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">
              {manual.title}
            </h2>
            <p className="text-center text-gray-600 text-sm whitespace-pre-wrap break-words">
              {manual.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
