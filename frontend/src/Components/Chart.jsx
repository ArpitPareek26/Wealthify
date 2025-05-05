import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useAuth } from "../AuthContext";

// Register necessary Chart.js modules
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Chart = () => {
  const { transactions } = useAuth();

  // ---------------------------
  // Pie Chart - Spending Distribution
  // ---------------------------
  // Filter expense transactions and group by category.
  const expenseTransactions = transactions.filter(
    (t) => t.type.toLowerCase() === "expense"
  );

  const categoryAggregation = expenseTransactions.reduce((acc, transaction) => {
    // If there's no category, fall back to "Others"
    const category = transaction.category || "Others";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const pieLabels = Object.keys(categoryAggregation);
  const pieValues = Object.values(categoryAggregation);

  // Set default colors for pie chart
  const defaultColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
  ];
  const pieColors = pieLabels.map(
    (_, index) => defaultColors[index % defaultColors.length]
  );

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Spending Distribution",
        data: pieValues,
        backgroundColor: pieColors,
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // ---------------------------
  // Bar Chart - Income vs Expenses Trends
  // ---------------------------
  // Aggregate transactions by month. We extract the month (short name) from the date.
  const monthlyAggregation = transactions.reduce((acc, transaction) => {
    const dateObj = new Date(transaction.date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    if (transaction.type.toLowerCase() === "income") {
      acc[month].income += transaction.amount;
    } else if (transaction.type.toLowerCase() === "expense") {
      acc[month].expense += transaction.amount;
    }
    return acc;
  }, {});

  // To ensure consistent month ordering, we reference a complete list of month labels.
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Filter only the months that appear in our aggregation.
  const sortedMonthLabels = allMonths.filter(
    (month) => month in monthlyAggregation
  );

  // Map the sorted months to the corresponding income and expense data.
  const incomeData = sortedMonthLabels.map(
    (month) => monthlyAggregation[month].income || 0
  );
  const expenseData = sortedMonthLabels.map(
    (month) => monthlyAggregation[month].expense || 0
  );

  const barData = {
    labels: sortedMonthLabels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Wealthify Charts
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie / Donut Chart */}
        <div className="bg-white rounded p-4 shadow-emerald-700 shadow-md border border-emerald-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Spending Distribution
          </h2>
          <div className="relative h-64">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                // The cutout property converts a Pie chart into a Donut Chart.
                cutout: "50%",
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded p-4 shadow-emerald-700 shadow-md border border-emerald-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Income vs Expenses Trends
          </h2>
          <div className="relative h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
