import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] relative">
      <Sidebar />
      <main className="flex-1 overflow-y-auto  bg-[#f8fafc]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
