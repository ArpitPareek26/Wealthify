import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAuth } from "../AuthContext";

// Register the necessary Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportChart = () => {
  const { transactions } = useAuth();

  // ---------------------------
  // Monthly Trends Data (Line Chart)
  // ---------------------------
  const monthlyLabels = [
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
  // Create arrays to store monthly totals for income and expense.
  const monthlyIncome = new Array(12).fill(0);
  const monthlyExpense = new Array(12).fill(0);
  transactions.forEach((transaction) => {
    const monthIndex = new Date(transaction.date).getMonth();
    if (transaction.type.toLowerCase() === "income") {
      monthlyIncome[monthIndex] += transaction.amount;
    } else if (transaction.type.toLowerCase() === "expense") {
      monthlyExpense[monthIndex] += transaction.amount;
    }
  });

  const monthlyData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Income",
        data: monthlyIncome,
        fill: true,
        backgroundColor: "rgba(46, 204, 113, 0.3)", // greenish
        borderColor: "rgba(46, 204, 113, 1)",
        tension: 0.3,
      },
      {
        label: "Monthly Expenses",
        data: monthlyExpense,
        fill: true,
        backgroundColor: "rgba(231, 76, 60, 0.3)", // reddish
        borderColor: "rgba(231, 76, 60, 1)",
        tension: 0.3,
      },
    ],
  };

  // ---------------------------
  // Yearly Trends Data (Bar Chart)
  // ---------------------------
  const yearlyIncome = {};
  const yearlyExpense = {};

  transactions.forEach((transaction) => {
    const year = new Date(transaction.date).getFullYear();
    if (transaction.type.toLowerCase() === "income") {
      yearlyIncome[year] = (yearlyIncome[year] || 0) + transaction.amount;
    } else if (transaction.type.toLowerCase() === "expense") {
      yearlyExpense[year] = (yearlyExpense[year] || 0) + transaction.amount;
    }
  });

  // Create a sorted list of years from both income and expense datasets.
  const allYears = new Set([
    ...Object.keys(yearlyIncome),
    ...Object.keys(yearlyExpense),
  ]);
  const sortedYearLabels = Array.from(allYears)
    .map(Number)
    .sort((a, b) => a - b)
    .map(String);

  const yearlyIncomeValues = sortedYearLabels.map(
    (year) => yearlyIncome[year] || 0
  );
  const yearlyExpenseValues = sortedYearLabels.map(
    (year) => yearlyExpense[year] || 0
  );

  const yearlyData = {
    labels: sortedYearLabels,
    datasets: [
      {
        label: "Yearly Income",
        data: yearlyIncomeValues,
        backgroundColor: "rgba(46, 204, 113, 0.7)",
      },
      {
        label: "Yearly Expenses",
        data: yearlyExpenseValues,
        backgroundColor: "rgba(231, 76, 60, 0.7)",
      },
    ],
  };

  // ---------------------------
  // Category Breakdown Data (Pie Charts)
  // ---------------------------
  // Income Category Breakdown
  const incomeTransactions = transactions.filter(
    (t) => t.type.toLowerCase() === "income"
  );
  const incomeCategoryAggregation = {};
  incomeTransactions.forEach((transaction) => {
    const category = transaction.category || "Others";
    incomeCategoryAggregation[category] =
      (incomeCategoryAggregation[category] || 0) + transaction.amount;
  });
  const incomeCategoryLabels = Object.keys(incomeCategoryAggregation);
  const incomeCategoryDataValues = Object.values(incomeCategoryAggregation);

  // Expense Category Breakdown
  const expenseTransactions = transactions.filter(
    (t) => t.type.toLowerCase() === "expense"
  );
  const expenseCategoryAggregation = {};
  expenseTransactions.forEach((transaction) => {
    const category = transaction.category || "Others";
    expenseCategoryAggregation[category] =
      (expenseCategoryAggregation[category] || 0) + transaction.amount;
  });
  const expenseCategoryLabels = Object.keys(expenseCategoryAggregation);
  const expenseCategoryDataValues = Object.values(expenseCategoryAggregation);

  // Define default colors for income and expense pie charts.
  const defaultIncomeColors = [
    "rgba(46, 204, 113, 0.7)",
    "rgba(39, 174, 96, 0.7)",
    "rgba(22, 160, 133, 0.7)",
    "rgba(88, 214, 141, 0.7)",
    "rgba(52, 152, 219, 0.7)",
  ];
  const incomePieColors = incomeCategoryLabels.map(
    (_, index) => defaultIncomeColors[index % defaultIncomeColors.length]
  );

  const defaultExpenseColors = [
    "rgba(231, 76, 60, 0.7)",
    "rgba(192, 57, 43, 0.7)",
    "rgba(211, 84, 0, 0.7)",
    "rgba(236, 112, 99, 0.7)",
    "rgba(192, 57, 43, 0.7)",
  ];
  const expensePieColors = expenseCategoryLabels.map(
    (_, index) => defaultExpenseColors[index % defaultExpenseColors.length]
  );

  const incomeCategoryData = {
    labels: incomeCategoryLabels,
    datasets: [
      {
        label: "Income by Category",
        data: incomeCategoryDataValues,
        backgroundColor: incomePieColors,
      },
    ],
  };

  const expenseCategoryData = {
    labels: expenseCategoryLabels,
    datasets: [
      {
        label: "Expenses by Category",
        data: expenseCategoryDataValues,
        backgroundColor: expensePieColors,
      },
    ],
  };

  // ---------------------------
  // Common Chart Options
  // ---------------------------
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Report Charts
      </h1>

      {/* Monthly Trends Chart (Line Chart) */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow-emerald-700 shadow-md border border-emerald-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Monthly Trends
        </h2>
        <div className="relative h-64">
          <Line data={monthlyData} options={commonOptions} />
        </div>
      </div>

      {/* Yearly Trends Chart (Bar Chart) */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow-emerald-700 shadow-md border border-emerald-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Yearly Trends
        </h2>
        <div className="relative h-64">
          <Bar data={yearlyData} options={commonOptions} />
        </div>
      </div>

      {/* Category Breakdown Charts (Two Pie Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
          <h2 className="text-xl font-semibold mb-4">
            Income Category Breakdown
          </h2>
          <div className="relative h-64">
            <Pie data={incomeCategoryData} options={commonOptions} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
          <h2 className="text-xl font-semibold mb-4">
            Expense Category Breakdown
          </h2>
          <div className="relative h-64">
            <Pie data={expenseCategoryData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportChart;
