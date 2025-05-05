import React, { useEffect } from "react";
import { useAuth } from "../AuthContext";

const Notifications = () => {
  const {
    budget = [],
    fetchBudget,
    transactions = [],
    fetchTransactions,
  } = useAuth();

  // Fetch budgets and transactions on mount.
  useEffect(() => {
    fetchBudget();
    fetchTransactions();
  }, [fetchBudget, fetchTransactions]);

  // Compute spending totals for each category using only expense transactions.
  const spendingByCategory = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense" && transaction.category) {
      const amount = parseFloat(transaction.amount) || 0;
      acc[transaction.category] = (acc[transaction.category] || 0) + amount;
    }
    return acc;
  }, {});

  // Build a notifications list from each budget entry.
  let notificationsList = budget.map((item) => {
    const { _id, category, amount } = item;
    const categoryBudget = parseFloat(amount) || 0;
    const spent = parseFloat(spendingByCategory[category]) || 0;
    const percentage = categoryBudget > 0 ? (spent / categoryBudget) * 100 : 0;

    // Decide type and content based on the percentage used.
    if (percentage >= 100) {
      return {
        id: _id || category,
        type: "alert",
        title: "Spending Limit Reached",
        message: `You have reached your spending limit for ${category}.`,
        icon: "🚨",
        percentage,
      };
    } else if (percentage >= 70) {
      return {
        id: _id || category,
        type: "warning",
        title: "Budget Warning",
        message: `You have used ${percentage.toFixed(
          0
        )}% of your budget in ${category}.`,
        icon: "⚠️",
        percentage,
      };
    } else {
      return {
        id: _id || category,
        type: "suggestion",
        title: "Financial Suggestion",
        message: `Your spending in ${category} is on track. Keep up the disciplined approach for even better control.`,
        icon: "🧾",
        percentage,
      };
    }
  });

  // Ensure exactly three notifications are shown.
  if (notificationsList.length > 3) {
    // Sort by percentage used in descending order so higher usage comes first.
    notificationsList.sort((a, b) => b.percentage - a.percentage);
    notificationsList = notificationsList.slice(0, 3);
  } else if (notificationsList.length < 3) {
    // Fill in with generic suggestions if there are fewer than three.
    const countToAdd = 3 - notificationsList.length;
    for (let i = 0; i < countToAdd; i++) {
      notificationsList.push({
        id: `suggestion-${i}`,
        type: "suggestion",
        title: "Financial Suggestion",
        message:
          "Keep tracking your spending to improve your overall financial health!",
        icon: "🧾",
        percentage: 0,
      });
    }
  }

  // Helper to assign styling based on notification type.
  const getStylesByType = (type) => {
    switch (type) {
      case "warning":
        return "shadow-emerald-700 shadow-md border border-emerald-700 bg-yellow-100";
      case "suggestion":
        return "shadow-emerald-700 shadow-md border border-emerald-700 bg-blue-100";
      case "alert":
      default:
        return "shadow-emerald-700 shadow-md border border-emerald-700 bg-red-100";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Notifications
      </h1>
      <div className="space-y-4">
        {notificationsList.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start p-4 rounded shadow-md border-l-4 ${getStylesByType(
              notif.type
            )}`}
          >
            <div className="flex-shrink-0">
              <span className="text-2xl">{notif.icon}</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{notif.title}</h3>
              <p className="mt-1 text-sm">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
