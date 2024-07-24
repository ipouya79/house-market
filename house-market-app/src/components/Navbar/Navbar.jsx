import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex flex-row-reverse justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link to={"/"}> بامامسکن</Link>
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? (
              <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <SunIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <div className="flex flex-row-reverse items-center space-x-4 gap-4">
            {user ? (
              <>
                <a
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                  href="/add-ad"
                >
                  ثبت آگهی
                </a>
                <button
                  className="text-red-500 dark:text-red-300 hover:underline"
                  onClick={logout}
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <a
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                  href="/login"
                >
                  ورود
                </a>
                <a
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                  href="/register"
                >
                  ثبت نام
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
