import React, { useState } from "react";
import BudgetForm from "../Components/BudgetForm";
import BudgetSummary from "../Components/BudgetSummary";

const Budgets = () => {
  // State for the budget limits. Initially set to some default values.
  const [budgets, setBudgets] = useState({
    dining: 200,
    groceries: 300,
    entertainment: 150,
    travel: 500,
  });

  // For demonstration, "spending" amounts are simulated.
  const [spending, setSpending] = useState({
    dining: 150,
    groceries: 250,
    entertainment: 100,
    travel: 50,
  });

  // Callback when BudgetForm is submitted.
  const handleBudgetSubmit = (newBudgets) => {
    setBudgets(newBudgets);
  };

  return (
    <div className="min-h-screen py-8 mt-14">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Budgets
          </h1>
          <p className="mt-2 text-xl text-gray-700">
            Set your spending limits for different categories.
          </p>
        </header>

        {/* Budget Form Section */}
        <div className="mb-12">
          <BudgetForm onSubmit={handleBudgetSubmit} initialData={budgets} />
        </div>

        {/* Budget Summary Section */}
        <BudgetSummary budgets={budgets} spending={spending} />
      </div>
    </div>
  );
};

export default Budgets;
