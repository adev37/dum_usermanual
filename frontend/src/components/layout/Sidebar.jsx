import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../services/api";
import SidebarDropdown from "./SidebarDropdown";
import { BookOpen, Home, Upload, LogOut } from "lucide-react";

const Sidebar = () => {
  const [manuals, setManuals] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios.get("/manuals").then((res) => setManuals(res.data));
  }, []);

  useEffect(() => {
    setOpenSidebar(false);
  }, [location.pathname]);

  const grouped = manuals.reduce((acc, manual) => {
    if (!acc[manual.category]) acc[manual.category] = [];
    acc[manual.category].push(manual);
    return acc;
  }, {});

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow fixed top-0 left-0 right-0 z-50">
        <span className="text-blue-700 font-bold text-lg">Manuals</span>
        <button
          className="text-2xl px-2 py-1 bg-white rounded shadow"
          onClick={() => setOpenSidebar(!openSidebar)}>
          {openSidebar ? "×" : "☰"}
        </button>
      </div>

      {/* Backdrop on Mobile */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-md border-r transition-transform duration-300 ease-in-out transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:z-auto`}>
        <div className="flex flex-col h-full p-4 pt-6 md:pt-4">
          {/* Title */}
          <div className="text-xl font-bold flex items-center gap-2 mb-6 text-blue-700">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Manuals
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto space-y-2 text-sm font-medium">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                location.pathname === "/dashboard"
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-blue-100 text-gray-800"
              }`}
              onClick={() => setOpenSidebar(false)}>
              <Home className="w-4 h-4" />
              Dashboard
            </Link>

            {/* Dynamic Dropdowns */}
            {Object.entries(grouped).map(([cat, items], idx) => (
              <SidebarDropdown
                key={idx}
                title={cat}
                items={items.map((manual) => ({
                  title: manual.title,
                  model: manual.model,
                  path: `/manual/view/${manual._id}`,
                }))}
                onSelect={() => setOpenSidebar(false)}
              />
            ))}
          </nav>

          {/* Bottom Links */}
          {/* Bottom Links */}
          <div className="mt-6 border-t border-gray-200 pt-4 space-y-3 text-sm">
            {role === "admin" && (
              <Link
                to="/upload"
                onClick={() => setOpenSidebar(false)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition">
                <Upload className="w-4 h-4" />
                Upload New Manual
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:underline transition w-full">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
