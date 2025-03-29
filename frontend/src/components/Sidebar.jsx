// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import {
//   FiMenu,
//   FiX,
//   FiLogOut,
//   FiPlus,
//   FiUser,
//   FiGrid,
//   FiBook,
// } from "react-icons/fi";

// const Sidebar = ({ activeTab, setActiveTab, onLogoutClick, userRole }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const tabs = [
//     { name: "dashboard", icon: <FiGrid />, label: "Dashboard", path: "/" },
//     {
//       name: "questionbank",
//       icon: <FiBook />,
//       label: "Procedure Steps",
//       path: "/question-bank",
//     },
//     {
//       name: "profile",
//       icon: <FiUser />,
//       label: "Profile",
//       path: "/userDetails",
//     },
//   ];

//   if (userRole === "admin") {
//     tabs.push({ name: "add", icon: <FiPlus />, label: "Add", path: "/add" });
//   }

//   const handleNavigation = (name, path = null) => {
//     setActiveTab(name);
//     if (path) navigate(path);
//     setTimeout(() => setIsOpen(false), 100);
//   };

//   return (
//     <>
//       {/* Mobile Top Navbar */}
//       <div className="md:hidden flex justify-between items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
//         <img src={logo} alt="Logo" className="h-10 w-auto" />
//         <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
//           {isOpen ? <FiX /> : <FiMenu />}
//         </button>
//       </div>

//       {/* Sidebar Drawer on Mobile */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform md:translate-x-0 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:flex flex-col`}>
//         {/* Logo Section */}
//         <div className="hidden md:flex items-center justify-center py-4 border-b">
//           <img src={logo} alt="Logo" className="h-12" />
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 mt-6 space-y-2 p-4">
//           {tabs.map(({ name, icon, label, path }) => (
//             <button
//               key={name}
//               onClick={() => handleNavigation(name, path)}
//               className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
//                 activeTab === name
//                   ? "bg-blue-600 text-white font-semibold"
//                   : "bg-blue-100 text-gray-700 hover:bg-blue-200"
//               }`}>
//               {icon}
//               <span className="hidden sm:inline">{label}</span>
//             </button>
//           ))}

//           {/* Logout */}
//           <button
//             onClick={onLogoutClick}
//             className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200">
//             <FiLogOut />
//             <span className="hidden sm:inline">Logout</span>
//           </button>
//         </nav>
//       </div>

//       {/* Mobile Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-30 md:hidden z-30"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;

//! ==============

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ activeTab, setActiveTab, onLogoutClick, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Define tabs
  const tabs = [
    { name: "dashboard", icon: "📊", label: "Dashboard" },
    {
      name: "questionbank",
      icon: "📚",
      label: "Procedure Steps",
      path: "/question-bank",
    },
    { name: "profile", icon: "👤", label: "Profile", path: "/userDetails" },
  ];

  if (userRole === "admin") {
    tabs.push({ name: "add", icon: "➕", label: "Add", path: "/add" });
  }

  // Handle tab click
  const handleNavigation = (name, path = null) => {
    setActiveTab(name);
    if (path) navigate(path);
    setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-md">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl focus:outline-none">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-white shadow-lg p-4 h-screen transform transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex flex-col z-50`}>
        {/* Logo Section */}
        <div className="flex items-center space-x-2 pb-4 border-b">
          <img src={logo} alt="Logo" className="h-12 md:h-16 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1">
          {tabs.map(({ name, icon, label, path }) => (
            <button
              key={name}
              className={`w-full text-left p-3 rounded-lg mb-2 font-medium flex items-center space-x-2 transition-all duration-300 focus:outline-none ${
                activeTab === name
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-blue-300 text-black hover:bg-blue-400"
              }`}
              onClick={() => handleNavigation(name, path)}>
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}

          {/* Logout Button */}
          <button
            className="w-full text-left p-3 rounded-lg mb-2 font-medium flex items-center space-x-2 transition-all duration-300 bg-red-300 text-black hover:bg-red-400 focus:outline-none"
            onClick={onLogoutClick}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
