import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarDropdown = ({ title, items, onSelect }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="text-sm text-gray-800">
      <button
        className="w-full flex justify-between items-center px-3 py-2 hover:bg-blue-50 rounded-md font-medium text-left transition"
        onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className="text-gray-500">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <ul className="pl-4 mt-2 space-y-1">
          {items.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className={`block px-2 py-1 rounded transition ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "hover:bg-blue-50 text-gray-700"
                }`}
                onClick={onSelect}>
                {item.title}{" "}
                <span className="text-xs text-gray-500">({item.model})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarDropdown;
