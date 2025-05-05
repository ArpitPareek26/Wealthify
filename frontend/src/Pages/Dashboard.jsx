import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Summary from "../Components/Summary";
import Chart from "../Components/Chart";
import Notifications from "../Components/Notifications";

const Dashboard = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen mt-18">
      <div className="container mx-auto p-4">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Wealthify Dashboard
          </h1>
          <p className="mt-2 text-xl text-gray-700">
            Your personal finance & budgeting overview
          </p>
        </header>

        {/* Summary Widgets */}
        <section className="mb-8">
          <Summary />
        </section>

        {/* Charts and Notifications */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Chart />
          </div>
          <div>
            <Notifications />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
