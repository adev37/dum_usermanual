import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const ManualViewer = ({ filePath, manualId, preview = true }) => {
  const fullUrl = `http://localhost:8080${filePath}`;

  return (
    <div className="relative bg-white">
      {/* Mobile Top Bar (like Dashboard) */}
      {!preview && (
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow fixed top-0 left-0 right-0 z-50">
          <span className="text-blue-700 font-bold text-lg">Manuals</span>
        </div>
      )}

      {/* PDF Viewer */}
      <div
        className={`mx-auto ${!preview ? "pt-20" : ""}`}
        style={{
          height: preview ? "50vh" : "93vh",
          width: preview ? "100%" : "90%",
          maxWidth: "1000px",
        }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={fullUrl} />
        </Worker>
      </div>

      {/* Bottom-right buttons (preview only) */}
      {preview && (
        <div className="flex flex-col sm:flex-row justify-end items-center gap-2 sm:gap-4 px-4 py-4">
          <a
            href={fullUrl}
            download
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
            ⬇️ Download Manual
          </a>
          <a
            href={`/manual/view/${manualId}`}
            className="text-blue-700 text-sm underline hover:text-blue-900">
            🔍 View Fullscreen
          </a>
        </div>
      )}
    </div>
  );
};

export default ManualViewer;
