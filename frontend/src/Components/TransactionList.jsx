import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import TransactionForm from "../Components/TransactionForm";

const TransactionList = () => {
  const { transactions, fetchTransactions, token } = useAuth();
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Fetch transactions when the component mounts.
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Format an ISO date string as DD-MM-YYYY.
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Delete a transaction using a relative URL.
  const handleDelete = async (id) => {
    // Ensure both the transaction id and token are present.
    if (!id || !token) {
      console.error("Missing transaction id or authorization token.");
      return;
    }

    const url = `http://localhost:4000/api/auth/transactions/${id}`;

    try {
      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Transaction deleted:", response.data);
      // Refresh the transaction list after successful deletion.
      await fetchTransactions();
    } catch (error) {
      if (error.response) {
        console.error(
          "Error deleting transaction:",
          error.response.data,
          error.response.status
        );
      } else {
        console.error("Error deleting transaction:", error.message);
      }
    }
  };

  // Update a transaction with new data.
  const handleUpdateTransaction = async (updatedData) => {
    // Ensure that the editing transaction data and token are available.
    if (!editingTransaction || !editingTransaction._id || !token) {
      console.error("Missing editing transaction data or authorization token.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/auth/transactions/${editingTransaction._id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Transaction updated successfully:", response.data);
      // Refresh the transaction list after update.
      await fetchTransactions();
      // Clear the editing transaction state to exit edit mode.
      setEditingTransaction(null);
    } catch (error) {
      // Log detailed error information.
      if (error.response) {
        console.error("Error updating transaction:", error.response.data);
      } else {
        console.error("Error updating transaction:", error.message);
      }
    }
  };

  // Ensure transactions is an array.
  const trans = Array.isArray(transactions) ? transactions : [];

  if (trans.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow-emerald-700 shadow-md border border-emerald-700">
        <table className="min-w-full bg-white">
          <thead className="bg-emerald-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-700">
            {transactions.map((transaction, index) => (
              <tr key={`${transaction._id}-${index}`}>
                <td className="px-4 py-2 text-gray-700">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-4 py-2 text-gray-700 capitalize">
                  {transaction.type}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Rs.{transaction.amount}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {transaction.category}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {transaction.description}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setEditingTransaction(transaction)}
                    className="text-blue-500 hover:text-blue-700 mr-2 focus:outline-none cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingTransaction && (
        <TransactionForm
          isOpen={true}
          initialData={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSubmit={handleUpdateTransaction}
        />
      )}
    </>
  );
};

export default TransactionList;
