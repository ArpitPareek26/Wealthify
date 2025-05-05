import React, { useEffect } from "react";
import banner1 from "../assets/banner1.jpg";
import { useLocation } from "react-router-dom";

const About = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="w-full mt-12">
      {/* Hero Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Wealthify
          </h1>
          <p className="text-lg text-gray-700">
            Wealthify is an application that empowers users to take control of
            their finances. Our platform allows you to track your income and
            expenses, set budgets by category, analyze spending patterns, and
            receive real-time alerts when you approach or exceed preset limits.
          </p>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="pb-6">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 text-lg">
              At Wealthify, we believe that financial freedom begins with
              understanding and control. Our team set out on a mission to
              simplify personal finance management—transforming a complex, often
              daunting task into an intuitive, empowering experience. With a
              focus on innovation, security, and transparency, we strive to help
              you build a more secure financial future.
            </p>
          </div>
          {/* Illustration */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={banner1}
              alt="Our Journey Illustration"
              className="w-full rounded-lg shadow-md shadow-emerald-700"
            />
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Income & Expenses Tracking */}
            <div className="p-6 bg-white rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Income &amp; Expenses Tracking
              </h3>
              <p className="text-gray-600">
                Log your income and expenditures effortlessly, keeping a clear
                overview of your cash flow.
              </p>
            </div>
            {/* Budget Management */}
            <div className="p-6 bg-white rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Budget Management
              </h3>
              <p className="text-gray-600">
                Set custom budgets for each spending category and stay informed
                with smart alerts.
              </p>
            </div>
            {/* Spending Analysis */}
            <div className="p-6 bg-white rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Spending Analysis
              </h3>
              <p className="text-gray-600">
                Uncover detailed insights into your spending habits with
                intuitive charts and reports.
              </p>
            </div>
            {/* Real-Time Alerts */}
            <div className="p-6 bg-white rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Real-Time Alerts
              </h3>
              <p className="text-gray-600">
                Receive instant notifications when you're close to or exceed
                your defined financial limits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
