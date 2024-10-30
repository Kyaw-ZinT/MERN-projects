import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./contexts/ThemeContext";
import { useContext } from "react";

export default function App() {
  let { isDark } = useContext(ThemeContext);

  return (
    <div className={`${isDark ? "bg-dbg" : "bg-gray-100"}`}>
      <Navbar />

      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
}
