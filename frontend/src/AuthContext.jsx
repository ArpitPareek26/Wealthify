import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token and user from localStorage.
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  });

  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState([]); // Always maintain an array

  const isAuthenticated = Boolean(token);

  // Login: Save JWT and user data.
  const login = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData);
    localStorage.setItem("authToken", jwtToken);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // Logout: Clear state and localStorage.
  const logout = () => {
    setToken(null);
    setUser(null);
    setTransactions([]);
    setBudget([]);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  // Update user information.
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };

  // Fetch transactions for the current user.
  const fetchTransactions = async () => {
    const userId = user?.id || user?._id;
    if (!token || !userId) return;

    try {
      const response = await axios.get(
        `https://wealthify-backend.onrender.com/api/auth/transactions/all/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Add a new transaction.
  const addTransaction = async (transactionData) => {
    const userId = user?.id || user?._id;
    if (!token || !userId) return;

    try {
      const data = { ...transactionData, user: userId };
      const response = await axios.post(
        "https://wealthify-backend.onrender.com/api/auth/transactions/add",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Fetch budget for the current user.
  const fetchBudget = async () => {
    const userId = user?.id || user?._id;
    if (!token || !userId) return;

    try {
      const response = await axios.get(
        `https://wealthify-backend.onrender.com/api/auth/budgets/all/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBudget(response.data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  // Add a budget for the current user.
  // budgetsData is expected to be an array of objects [{ category, amount }, ...]
  const addBudget = async (budgetsData) => {
    const userId = user?.id || user?._id;
    if (!token || !userId) return;

    // Filter for valid entries and attach the user for each budget item.
    const validBudgets = budgetsData
      .filter(
        (b) => b.category.trim() !== "" && b.amount.toString().trim() !== ""
      )
      .map((b) => ({
        category: b.category,
        amount: Number(b.amount), // Ensure amount is a number
        user: userId, // Attach the user id to each budget item
      }));

    if (!validBudgets.length) {
      console.error("No valid budgets provided.");
      return;
    }

    try {
      const budgetPromises = validBudgets.map((budgetItem) =>
        axios.post("https://wealthify-backend.onrender.com/api/auth/budgets/add", budgetItem, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      const responses = await Promise.all(budgetPromises);
      // Extract the new budget documents from each response.
      const newBudgets = responses.map((res) => res.data);
      // Update state with the returned budget data.
      setBudget((prev) => [...prev, ...newBudgets]);
    } catch (error) {
      console.error(
        "Error adding budget:",
        error.response?.data || error.message
      );
    }
  };

  // Delete a budget document for the current user.
  const deleteBudget = async (budgetId) => {
    if (!budgetId) return;
    try {
      await axios.delete(`https://wealthify-backend.onrender.com/api/auth/budgets/${budgetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update state by removing the deleted budget.
      setBudget((prev) => prev.filter((item) => item._id !== budgetId));
    } catch (error) {
      console.error(
        "Error deleting budget:",
        error.response?.data || error.message
      );
    }
  };

  // Re-fetch transactions and budgets when token or user changes.
  useEffect(() => {
    const userId = user?.id || user?._id;
    if (token && userId) {
      fetchTransactions();
      fetchBudget();
    } else {
      setTransactions([]);
      setBudget([]);
    }
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        transactions,
        fetchTransactions,
        addTransaction,
        budget,
        fetchBudget,
        addBudget,
        deleteBudget,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
