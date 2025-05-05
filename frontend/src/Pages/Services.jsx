import React, { useEffect } from "react";
import alert from "../assets/alert.png";
import calculator from "../assets/calculator.png";
import finance from "../assets/finance.png";
import money from "../assets/money.png";
import { useLocation } from "react-router-dom";

const Services = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="w-full mt-12">
      {/* Intro Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            At Wealthify, we equip you with powerful tools to manage your
            finances. Explore our suite of services designed to help you track
            income and expenses, set budgets by category, analyze your spending
            patterns, and receive real-time alerts.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1: Income & Expense Tracking */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <div className="mb-4">
                <img
                  className="w-16 h-16 mx-auto"
                  src={finance}
                  alt="Income & Expense Tracking Icon"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                Income & Expense Tracking
              </h2>
              <p className="text-gray-600 text-center">
                Effortlessly log your earnings and expenditures, keeping a clear
                record of your cash flow.
              </p>
            </div>

            {/* Service 2: Budget by Category */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <div className="mb-4">
                <img
                  className="w-16 h-16 mx-auto"
                  src={calculator}
                  alt="Budget by Category Icon"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                Budget by Category
              </h2>
              <p className="text-gray-600 text-center">
                Create customized budgets for each spending category to maintain
                financial discipline.
              </p>
            </div>

            {/* Service 3: Spending Analysis */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <div className="mb-4">
                <img
                  className="w-16 h-16 mx-auto"
                  src={money}
                  alt="Spending Analysis Icon"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                Spending Analysis
              </h2>
              <p className="text-gray-600 text-center">
                Dive into detailed insights with charts and reports that reveal
                your spending habits.
              </p>
            </div>

            {/* Service 4: Real-Time Alerts */}
            <div className="bg-white p-6 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <div className="mb-4">
                <img
                  className="w-16 h-16 mx-auto"
                  src={alert}
                  alt="Real-Time Alerts Icon"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                Real-Time Alerts
              </h2>
              <p className="text-gray-600 text-center">
                Stay on top of your finances with instant notifications as you
                near or exceed your limits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
