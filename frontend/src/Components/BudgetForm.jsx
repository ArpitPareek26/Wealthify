import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../AuthContext";

const BudgetForm = ({ initialBudgets = [] }) => {
  // Destructure the addBudget function from AuthContext.
  const { addBudget } = useAuth();

  const [budgets, setBudgets] = useState(
    initialBudgets.length > 0 ? initialBudgets : [{ category: "", amount: "" }]
  );

  useEffect(() => {
    if (initialBudgets.length > 0) {
      setBudgets(initialBudgets);
    }
  }, [initialBudgets]);

  // Remove a specific budget row.
  const removeBudgetRow = (index) => {
    const updatedBudgets = budgets.filter((_, i) => i !== index);
    setBudgets(updatedBudgets);
  };

  // Handle input changes.
  const handleBudgetChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBudgets = [...budgets];
    updatedBudgets[index] = { ...updatedBudgets[index], [name]: value };
    setBudgets(updatedBudgets);
  };

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only consider budgets with valid data
    const validBudgets = budgets.filter(
      (b) => b.category.trim() !== "" && b.amount.toString().trim() !== ""
    );
    if (validBudgets.length === 0) {
      alert("Please enter at least one valid budget.");
      return;
    }
    try {
      await addBudget(validBudgets);
      // Reset form with one empty row
      setBudgets([{ category: "", amount: "" }]);
    } catch (error) {
      console.error("Error saving budget:", error);
      alert("Failed to save budget.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-emerald-700 shadow-md border border-emerald-700"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Define Your Budget Limits
      </h2>

      <div className="space-y-4">
        {budgets.map((budget, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:space-x-4 pb-4"
          >
            <div className="flex-1">
              <label
                htmlFor={`category-${index}`}
                className="block text-gray-700 mb-1"
              >
                Category
              </label>
              <input
                type="text"
                id={`category-${index}`}
                name="category"
                value={budget.category}
                onChange={(e) => handleBudgetChange(index, e)}
                placeholder="e.g., Dining"
                className="mt-1 w-full border border-emerald-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                required
              />
            </div>
            <div className="flex-1 mt-4 sm:mt-0">
              <label
                htmlFor={`amount-${index}`}
                className="block text-gray-700 mb-1"
              >
                Amount
              </label>
              <input
                type="number"
                id={`amount-${index}`}
                name="amount"
                value={budget.amount}
                onChange={(e) => handleBudgetChange(index, e)}
                placeholder="e.g., 200"
                className="mt-1 w-full border border-emerald-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                required
              />
            </div>
            {budgets.length > 1 && (
              <button
                type="button"
                onClick={() => removeBudgetRow(index)}
                className="mt-4 sm:mt-0 text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
                aria-label="Remove budget row"
              >
                <FaTrash size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2 rounded transition cursor-pointer"
        >
          Save Budget
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
