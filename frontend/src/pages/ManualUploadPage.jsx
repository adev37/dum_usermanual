// src/pages/ManualUploadPage.jsx
import { useState } from "react";
import axios from "../services/api";

const ManualUploadPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    model: "",
    category: "",
    description: "",
    pdf: null,
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf" || name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, model, category, description, pdf, image } = formData;
    if (!title || !model || !category || !description || !pdf || !image) {
      return setMessage("❗ Please fill all fields and upload both files.");
    }

    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("model", model);
    uploadData.append("category", category);
    uploadData.append("description", description);
    uploadData.append("pdf", pdf);
    uploadData.append("image", image);

    try {
      const res = await axios.post("/manuals/upload", uploadData);
      setMessage(`✅ Upload successful: ${res.data.title}`);
      setFormData({
        title: "",
        model: "",
        category: "",
        description: "",
        pdf: null,
        image: null,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        <span>📤</span> Upload Device Manual
      </h2>

      <div className="bg-white rounded-lg shadow p-6 max-w-5xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model:
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category:
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image File:
            </label>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              PDF File:
            </label>
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Upload Manual
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-center text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ManualUploadPage;
