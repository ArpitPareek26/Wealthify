import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAccordionVisible, setAccordionVisible] = useState(false);

  const handleToggle = () => {
    setAccordionVisible(!isAccordionVisible);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/users/logout",
        {},
        { withCredentials: true }
      );
      // Delegate state handling to the auth context
      logout();
      // Redirect the user to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-emerald-700 p-4 fixed z-50 top-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Wealthify
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="hover:text-gray-200 cursor-pointer"
            >
              Dashboard
            </Link>
          ) : (
            <li>
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
            </li>
          )}
          {isAuthenticated ? (
            <Link
              to="/transactions"
              className="hover:text-gray-200 cursor-pointer"
            >
              Transactions
            </Link>
          ) : (
            <li>
              <Link to="/about" className="hover:text-gray-200">
                About
              </Link>
            </li>
          )}
          {isAuthenticated ? (
            <Link to="/budgets" className="hover:text-gray-200 cursor-pointer">
              Budgets
            </Link>
          ) : null}
          {isAuthenticated ? (
            <Link to="/reports" className="hover:text-gray-200 cursor-pointer">
              Reports
            </Link>
          ) : null}
          {isAuthenticated ? (
            <li
              onClick={handleLogout}
              className="hover:text-gray-200 cursor-pointer"
            >
              Logout
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            aria-expanded={isAccordionVisible}
            onClick={handleToggle} // Toggle visibility
          >
            {/* Icon for Mobile */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Accordion Menu */}
      {isAccordionVisible && (
        <div className="mt-4 md:hidden">
          <ul className="space-y-4 bg-emerald-600 text-white p-4">
            <li onClick={handleToggle}>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/"
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  Home
                </Link>
              )}
            </li>
            <li onClick={handleToggle}>
              {isAuthenticated ? (
                <Link
                  to="/transactions"
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  Transactions
                </Link>
              ) : (
                <Link
                  to="/about"
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  About
                </Link>
              )}
            </li>
            <li onClick={handleToggle}>
              {isAuthenticated ? (
                <Link
                  to="/budgets"
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  Budgets
                </Link>
              ) : null}
            </li>
            <li onClick={handleToggle}>
              {isAuthenticated ? (
                <Link
                  to="/reports"
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  Reports
                </Link>
              ) : (
                <Link
                  to="/contact"
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  Contact
                </Link>
              )}
            </li>
            <li onClick={handleToggle}>
              {isAuthenticated ? (
                <li
                  onClick={handleLogout}
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  Logout
                </li>
              ) : (
                <Link
                  to="/login"
                  className="block text-sm font-medium hover:bg-blue-800 hover:text-gray-300 px-3 py-2 rounded"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
