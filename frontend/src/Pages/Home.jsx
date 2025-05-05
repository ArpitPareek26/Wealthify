import React, { useEffect } from "react";
import banner from "../assets/banner.jpg";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="w-full mt-12">
      {/* Hero Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center">
            {/* Text Content */}
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Take Control of Your Finances with Wealthify
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Empower yourself by tracking income and expenses, setting
                budgets by category, analyzing spending patterns, and receiving
                alerts when you approach or exceed limits.
              </p>
              <div className="mt-6">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="px-6 py-2 bg-emerald-700 text-white font-semibold rounded-md hover:bg-emerald-800 transition duration-300"
                  >
                    {user && user.name
                      ? `Welcome, ${user.name}!`
                      : "Get Started"}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="px-6 py-2 bg-emerald-700 text-white font-semibold rounded-md hover:bg-emerald-800 transition duration-300"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>

            {/* Illustration Section */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={banner}
                alt="Financial Dashboard Illustration"
                className="w-full rounded-lg shadow-md shadow-emerald-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Track Income &amp; Expenses
              </h3>
              <p className="text-gray-600">
                Easily log your income and expenditures in one centralized
                platform.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Budget by Category
              </h3>
              <p className="text-gray-600">
                Set custom budgets for distinct spending categories to tailor
                your financial plan.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Analyze Spending Patterns
              </h3>
              <p className="text-gray-600">
                Gain insights into your spending habits with detailed charts and
                trends.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Real-Time Alerts
              </h3>
              <p className="text-gray-600">
                Receive timely notifications as you approach or exceed preset
                limits.
              </p>
            </div>
            {/* Optional Feature */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Financial Reports
              </h3>
              <p className="text-gray-600">
                Download detailed financial reports for a comprehensive
                analysis.
              </p>
            </div>
            {/* Optional Feature */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Secure &amp; Private
              </h3>
              <p className="text-gray-600">
                Enjoy peace of mind with top-level security practices to protect
                your data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
