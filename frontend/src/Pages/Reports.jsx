import React, { useState } from "react";
import ReportChart from "../Components/ReportChart";

const Reports = () => {
  return (
    <div className="min-h-screen py-8 mt-14">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Reports
          </h1>
          <p className="mt-2 text-xl text-gray-700">
            View and analyze your financial reports
          </p>
        </header>

        {/* ReportChart Component - visualizes various financial reports */}
        <ReportChart />
      </div>
    </div>
  );
};

export default Reports;
