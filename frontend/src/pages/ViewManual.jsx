import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";
import ManualViewer from "../components/layout/ManualViewer";

const ViewManual = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manual, setManual] = useState(null);
  const [error, setError] = useState("");
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    axios
      .get(`/manuals/${id}`)
      .then((res) => setManual(res.data))
      .catch((err) => {
        console.error("Error fetching manual:", err);
        setError("❌ Manual not found.");
      });
  }, [id]);

  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!manual) return <p className="p-4">Loading manual...</p>;

  const fullUrl = `http://localhost:8080${manual.file}`;
  const imageUrl = `http://localhost:8080${manual.image}`;

  return (
    <div className="bg-white min-h-screen">
      {/* ✅ Mobile Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow fixed top-0 left-0 right-0 z-50 md:hidden">
        <span className="text-blue-700 font-bold text-lg">Manuals</span>
        <button
          onClick={() => {
            if (showViewer) {
              setShowViewer(false);
            } else {
              navigate("/");
            }
          }}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm rounded shadow text-gray-700">
          {showViewer ? "🔙 Back to Details" : "🔙 Back"}
        </button>
      </div>

      {/* ✅ PDF View Mode */}
      {showViewer ? (
        <>
          <div className="hidden md:flex justify-end items-center px-6 pt-6">
            <button
              onClick={() => setShowViewer(false)}
              className="bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 px-4 py-2 rounded shadow">
              🔙 Back to Details
            </button>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <ManualViewer
              filePath={manual.file}
              manualId={manual._id}
              preview={false}
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-inner z-40 flex justify-center md:hidden">
            <button
              onClick={() => setShowViewer(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-6 py-2 rounded shadow">
              🔙 Back to Details
            </button>
          </div>
        </>
      ) : (
        // 📘 Manual Detail View
        <div className="max-w-6xl mx-auto p-6 md:pt-2 relative mt-[55px] md:mt-0">
          {/* 🧾 Title & Model */}
          <div className="mb-4">
            {/* Mobile & Tablet: stacked */}
            <div className="block lg:hidden">
              <h2 className="text-2xl font-bold text-blue-800">
                {manual.title}
              </h2>
              <span className="text-sm text-gray-600 font-medium mt-1 block">
                Model: {manual.model}
              </span>
            </div>

            {/* Desktop only: inline */}
            <div className="hidden lg:flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-800">
                {manual.title}
              </h2>
              <span className="text-sm text-gray-600 font-medium">
                Model: {manual.model}
              </span>
            </div>
          </div>

          {/* 📷 Manual Image */}
          <div className="bg-white p-4 rounded shadow mb-4 flex justify-center">
            <img
              src={imageUrl}
              alt={manual.title}
              className="max-h-96 object-contain"
            />
          </div>

          {/* 📝 Description */}
          <p className="text-gray-700 text-base mb-8 whitespace-pre-wrap break-words">
            {manual.description}
          </p>

          {/* 📂 Action Buttons */}
          <div className="flex justify-between items-center w-full mt-4">
            <div>
              <button
                onClick={() => setShowViewer(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                🔍 View User Manual
              </button>
            </div>
            <div>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(fullUrl);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                      "download",
                      `${manual.title || "manual"}.pdf`
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);
                  } catch (err) {
                    console.error("Download failed", err);
                    alert("❌ Failed to download file.");
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                ⬇️ User Manual Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewManual;
