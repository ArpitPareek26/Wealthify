import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TransactionList from "../Components/TransactionList";
import TransactionForm from "../Components/TransactionForm";

const Transaction = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // Initialize local state for transactions.
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2025-04-20",
      amount: 250,
      category: "Groceries",
      description: "Walmart grocery shopping",
    },
    {
      id: 2,
      date: "2025-04-21",
      amount: 1500,
      category: "Salary",
      description: "April salary deposit",
    },
    {
      id: 3,
      date: "2025-04-22",
      amount: -120,
      category: "Entertainment",
      description: "Movie night",
    },
    {
      id: 4,
      date: "2025-04-23",
      amount: -300,
      category: "Utilities",
      description: "Electricity bill",
    },
  ]);

  // State to manage the visibility of TransactionForm modal.
  const [isFormOpen, setIsFormOpen] = useState(false);

  // For future expansion (edit mode), the current transaction to edit
  const [currentTransaction, setCurrentTransaction] = useState(null);

  // Function to handle adding a new transaction.
  const handleAddTransaction = (transactionData) => {
    const newTransaction = { ...transactionData, id: transactions.length + 1 };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  // Function to open the form for adding a new transaction.
  const openForm = () => {
    setCurrentTransaction(null);
    setIsFormOpen(true);
  };

  // Function to close the form modal.
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen mt-18">
      <div className="container mx-auto p-4">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Transactions</h1>
          <p className="mt-2 text-xl text-gray-700">
            Manage your transactions on Wealthify
          </p>
        </header>

        {/* Add Transaction Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={openForm}
            className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 transition cursor-pointer"
          >
            Add Transaction
          </button>
        </div>

        {/* Transaction List */}
        <TransactionList transactions={transactions} />

        {/* Transaction Form Modal */}
        <TransactionForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSubmit={handleAddTransaction}
          initialData={currentTransaction || {}}
        />
      </div>
    </div>
  );
};

export default Transaction;
