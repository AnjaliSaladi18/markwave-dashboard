// src/components/Navbar.jsx
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";
import LogoutModal from "./LogoutModal";
import { FaUserCircle } from "react-icons/fa";


const Navbar = ({ activeTab, setActiveTab }) => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  const dispatch = useDispatch();

  const [openLogout, setOpenLogout] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );



  // Apply theme on mount + toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 gap-4 sm:gap-0 mt-6 border-b border-[#00878a] pb-6 max-w-[1080px] w-full mx-auto">
        {/* LEFT — Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setActiveTab("Referral")}
            className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 
              ${activeTab === "Referral"
                ? "bg-[#00878a] text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700"
              }`}
          >
            Referral
          </button>

          <button
            onClick={() => setActiveTab("Verified Users")}
            className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105
              ${activeTab === "Verified Users"
                ? "bg-[#00878a] text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700"
              }`}
          >
            Verified Users
          </button>

          {role === "SUPERADMIN" && (
            <button
              onClick={() => setActiveTab("Products")}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 
                ${activeTab === "Products"
                  ? "bg-[#00878a] text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700"
                }`}
            >
              Products
            </button>
          )}
        </div>

        {/* RIGHT — Theme Toggle + Logout */}
        <div className="flex items-center gap-4">

          {/* USERNAME DISPLAY */}
          <div className="flex items-center justify-center gap-1 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
            <FaUserCircle className="text-[#00878a] dark:text-[#4dd0d0] text-lg" />
            <span className="text-xs font-medium text-[#00878a] dark:text-[#4dd0d0]">
              {user?.username}
            </span>
          </div>

          {/* THEME TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-[#00878a] text-xl cursor-pointer hover:scale-110 transition-all duration-300"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* LOGOUT ICON */}
          <FiLogOut
            size={24}
            className="text-[#00878a] cursor-pointer hover:text-red-600 dark:hover:text-red-300 hover:scale-110 transition-all duration-300"
            onClick={() => setOpenLogout(true)}
          />
        </div>
      </div>

      {/* LOGOUT MODAL */}
      <LogoutModal
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={() => dispatch(logout())}
      />
    </>
  );
};

export default Navbar;