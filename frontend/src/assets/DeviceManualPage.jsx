import { useEffect, useState } from "react";
import axios from "../services/api";
import ManualViewer from "../components/layout/ManualViewer";
import { Link } from "react-router-dom";

const DeviceManualPage = () => {
  const [manuals, setManuals] = useState([]);

  useEffect(() => {
    axios
      .get("/manuals")
      .then((res) => setManuals(res.data))
      .catch((err) => console.error("Failed to fetch manuals:", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📘 Device Manuals
      </h2>

      {manuals.length === 0 ? (
        <p className="text-gray-500">No manuals found.</p>
      ) : (
        <div className="space-y-6">
          {manuals.map((manual) => (
            <div
              key={manual._id}
              className="bg-white shadow border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {manual.title}
                <span className="text-sm text-gray-500"> ({manual.model})</span>
              </h3>

              <div className="mb-4">
                {/* Shrinked viewer */}
                <ManualViewer filePath={manual.file} height="60vh" />
              </div>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>
                  Uploaded at:{" "}
                  {new Date(manual.uploadedAt).toLocaleDateString()}
                </span>
                <div className="flex gap-3">
                  <a
                    href={manual.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-blue-600 hover:underline">
                    ⬇️ Download
                  </a>
                  <Link
                    to={`/manual/view/${manual._id}`}
                    className="text-blue-600 hover:underline font-medium">
                    🔍 View Full Page
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceManualPage;
