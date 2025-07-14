import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarDropdown = ({ title, items, onSelect }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      className="group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      {/* Dropdown Button */}
      <button
        className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition-all duration-150 ${
          open ? "bg-blue-100 text-blue-800" : "hover:bg-blue-50"
        }`}>
        <span className="font-medium">{title}</span>
        <span className="text-xs text-gray-500">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown Items */}
      {open && (
        <ul className="pl-4 mt-1 space-y-1">
          {items.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className={`block px-3 py-1 rounded-md transition text-sm ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "hover:bg-blue-100 text-gray-700"
                }`}
                onClick={onSelect}>
                {item.title}{" "}
                <span className="text-xs text-gray-400">({item.model})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarDropdown;
