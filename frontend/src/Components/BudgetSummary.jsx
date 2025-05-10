// import React, { useEffect } from "react";
// import { useAuth } from "../AuthContext";

// const BudgetSummary = ({ onDeleteBudget }) => {
//   const { budget, fetchBudget, deleteBudget, transactions, fetchTransactions } =
//     useAuth();

//   // Fetch budgets and transactions on component mount.
//   useEffect(() => {
//     fetchBudget();
//     fetchTransactions();
//   }, [fetchBudget, fetchTransactions]);

//   // Convert the budget array into an object keyed by category.
//   const budgetsObj = budget.reduce((acc, curr) => {
//     acc[curr.category] = curr.amount;
//     return acc;
//   }, {});

//   // Calculate total spending (expenses) per category from transactions.
//   const spendingByCategory = transactions.reduce((acc, transaction) => {
//     // Only include transactions with type 'expense'
//     if (transaction.type === "expense" && transaction.category) {
//       const amount = parseFloat(transaction.amount) || 0;
//       acc[transaction.category] = (acc[transaction.category] || 0) + amount;
//     }
//     return acc;
//   }, {});

//   // Get a list of all categories from budgets.
//   const categories = Object.keys(budgetsObj);

//   // Handle deletion of a budget category.
//   const handleDelete = async (category) => {
//     if (onDeleteBudget) {
//       await onDeleteBudget(category);
//     } else {
//       const budgetToDelete = budget.find((b) => b.category === category);
//       if (budgetToDelete && budgetToDelete._id) {
//         try {
//           await deleteBudget(budgetToDelete._id);
//         } catch (error) {
//           console.error("Error deleting budget:", error);
//         }
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Budget Summary
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {categories.map((category) => {
//           const categoryBudget = parseFloat(budgetsObj[category]) || 0;
//           const spent = parseFloat(spendingByCategory[category]) || 0;
//           const percentage =
//             categoryBudget > 0 ? (spent / categoryBudget) * 100 : 0;
//           const displayPercentage = percentage > 100 ? 100 : percentage;
//           const isOverBudget = spent > categoryBudget;

//           return (
//             <div
//               key={category}
//               className="p-4 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700"
//             >
//               {/* Header: Category Title & Delete Button */}
//               <div className="flex justify-between items-center mb-2">
//                 <span className="font-bold capitalize text-gray-800">
//                   {category}
//                 </span>
//                 <button
//                   onClick={() => handleDelete(category)}
//                   className="text-sm text-white bg-red-500 hover:bg-red-600 rounded px-2 py-1 cursor-pointer"
//                 >
//                   Delete
//                 </button>
//               </div>

//               {/* Spending vs. Budget Info */}
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm text-gray-500">
//                   Rs.{spent.toFixed(2)} / Rs.{categoryBudget.toFixed(2)}
//                 </span>
//               </div>

//               {/* Progress Bar */}
//               <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full rounded-full ${
//                     isOverBudget ? "bg-red-500" : "bg-green-500"
//                   }`}
//                   style={{ width: `${displayPercentage}%` }}
//                 ></div>
//               </div>

//               {/* Usage Info */}
//               <div className="text-sm mt-1">
//                 {isOverBudget
//                   ? `Over Budget by ${Math.max(percentage - 100, 0).toFixed(
//                       0
//                     )}%`
//                   : `${displayPercentage.toFixed(0)}% used`}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BudgetSummary;

import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";

const BudgetSummary = ({ onDeleteBudget }) => {
  const { budget, fetchBudget, deleteBudget, transactions, fetchTransactions } =
    useAuth();

  const [loadingDelete, setLoadingDelete] = useState({});

  // Fetch budgets and transactions on component mount.
  useEffect(() => {
    fetchBudget();
    fetchTransactions();
  }, [fetchBudget, fetchTransactions]);

  // Convert the budget array into an object keyed by category.
  const budgetsObj = budget.reduce((acc, curr) => {
    acc[curr.category] = curr.amount;
    return acc;
  }, {});

  // Calculate total spending (expenses) per category from transactions.
  const spendingByCategory = transactions.reduce((acc, transaction) => {
    // Only include transactions with type 'expense'
    if (transaction.type === "expense" && transaction.category) {
      const amount = parseFloat(transaction.amount) || 0;
      acc[transaction.category] = (acc[transaction.category] || 0) + amount;
    }
    return acc;
  }, {});

  // Get a list of all categories from budgets.
  const categories = Object.keys(budgetsObj);

  // Handle deletion of a budget category.
  const handleDelete = async (category) => {
    // Set loading state for the category being deleted.
    setLoadingDelete((prev) => ({ ...prev, [category]: true }));

    if (onDeleteBudget) {
      try {
        await onDeleteBudget(category);
      } catch (error) {
        console.error("Error deleting budget:", error);
      }
    } else {
      const budgetToDelete = budget.find((b) => b.category === category);
      if (budgetToDelete && budgetToDelete._id) {
        try {
          await deleteBudget(budgetToDelete._id);
        } catch (error) {
          console.error("Error deleting budget:", error);
        }
      }
    }
    // Reset the loading state for this category upon completion.
    setLoadingDelete((prev) => ({ ...prev, [category]: false }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Budget Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const categoryBudget = parseFloat(budgetsObj[category]) || 0;
          const spent = parseFloat(spendingByCategory[category]) || 0;
          const percentage =
            categoryBudget > 0 ? (spent / categoryBudget) * 100 : 0;
          const displayPercentage = percentage > 100 ? 100 : percentage;
          const isOverBudget = spent > categoryBudget;

          return (
            <div
              key={category}
              className="p-4 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700"
            >
              {/* Header: Category Title & Delete Button */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold capitalize text-gray-800">
                  {category}
                </span>
                <button
                  onClick={() => handleDelete(category)}
                  disabled={loadingDelete[category] === true}
                  className={`text-sm text-white rounded px-2 py-1 ${
                    loadingDelete[category]
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 cursor-pointer"
                  }`}
                >
                  {loadingDelete[category] ? "Deleting..." : "Delete"}
                </button>
              </div>

              {/* Spending vs. Budget Info */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Rs. {spent.toFixed(2)} / Rs. {categoryBudget.toFixed(2)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isOverBudget ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${displayPercentage}%` }}
                ></div>
              </div>

              {/* Usage Info */}
              <div className="text-sm mt-1">
                {isOverBudget
                  ? `Over Budget by ${Math.max(percentage - 100, 0).toFixed(
                      0
                    )}%`
                  : `${displayPercentage.toFixed(0)}% used`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetSummary;
