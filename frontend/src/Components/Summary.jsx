import React from "react";
import { useAuth } from "../AuthContext";

const Summary = () => {
  const { transactions } = useAuth();

  // Compute total income and total expenses from the transactions.
  const totalIncome = transactions.reduce((acc, transaction) => {
    return transaction.type.toLowerCase() === "income"
      ? acc + transaction.amount
      : acc;
  }, 0);

  const totalExpenses = transactions.reduce((acc, transaction) => {
    return transaction.type.toLowerCase() === "expense"
      ? acc + transaction.amount
      : acc;
  }, 0);

  const netBalance = totalIncome - totalExpenses;

  // Sort transactions by date (newest first) and get the four most recent entries.
  const recentActivities = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  // Format an ISO date string as "DD-MM-YYYY"
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Financial Summary
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded shadow-emerald-700 shadow-md border border-emerald-700">
          <h2 className="text-xl font-semibold">Total Income</h2>
          <p className="mt-2 text-2xl font-bold text-green-700">
            Rs.{totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="bg-red-100  p-4 rounded  shadow-emerald-700 shadow-md border border-emerald-700">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
          <p className="mt-2 text-2xl font-bold text-red-700">
            Rs.{totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded  shadow-emerald-700 shadow-md border border-emerald-700">
          <h2 className="text-xl font-semibold">Net Balance</h2>
          <p className="mt-2 text-2xl font-bold text-blue-700">
            Rs.{netBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded  p-4 shadow-emerald-700 shadow-md border border-emerald-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Activities
        </h3>
        {recentActivities.length === 0 ? (
          <p className="text-gray-500">No recent activities.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Description
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <tr key={activity._id || activity.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(activity.date)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 capitalize">
                      {activity.type}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                      {activity.description}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right">
                      {activity.type.toLowerCase() === "expense" ? "-" : "+"}Rs.
                      {activity.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
