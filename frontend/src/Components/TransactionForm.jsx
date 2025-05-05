import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";

const TransactionForm = ({
  isOpen,
  onClose,
  initialData = {},
  onSubmit = null, // Provide a default value so it's never undefined
}) => {
  const { addTransaction } = useAuth();

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "income",
    category: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate the form if initialData is provided (edit mode)
  useEffect(() => {
    if (isOpen) {
      setFormData({
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : "",
        amount: initialData.amount || "",
        type: initialData.type || "income",
        category: initialData.category || "",
        description: initialData.description || "",
      });
    }
  }, [initialData, isOpen]);

  // Reset the form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        date: "",
        amount: "",
        type: "income",
        category: "",
        description: "",
      });
      setError(null);
    }
  }, [isOpen]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Decide which action to use for submission.
  // If we are editing (initialData contains _id) and a valid onSubmit function is provided, use it.
  // Otherwise, fallback to addTransaction.
  const submitAction =
    initialData && initialData._id && typeof onSubmit === "function"
      ? onSubmit
      : addTransaction;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await submitAction(formData);
      // Clear form state after successful submission.
      setFormData({
        date: "",
        amount: "",
        type: "income",
        category: "",
        description: "",
      });
      onClose(); // Close the modal after submission.
    } catch (err) {
      console.error("Error saving transaction:", err);
      setError("Failed to save transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 shadow-emerald-700 shadow-md border border-emerald-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData.date ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl cursor-pointer"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-emerald-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border border-emerald-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border border-emerald-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Groceries, Salary, etc."
              required
              className="w-full border border-emerald-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description of the transaction"
              required
              className="w-full border border-emerald-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-emerald-700 text-white px-4 py-2 rounded transition cursor-pointer ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-emerald-800"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
