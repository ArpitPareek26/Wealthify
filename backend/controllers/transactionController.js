import Transaction from "../models/transactionModel.js";

// GET all transactions for a specific user, sorted by date (most recent first)
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.params.userId,
    }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new transaction
const createTransaction = async (req, res) => {
  const { date, amount, type, category, description, user } = req.body;
  const transaction = new Transaction({
    date,
    amount,
    type,
    category,
    description,
    user,
  });
  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Middleware to get a transaction by ID and attach it to res.transaction
const getTransaction = async (req, res, next) => {
  let transaction;
  try {
    transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.transaction = transaction;
  next();
};

// PUT update a transaction by ID
const updateTransaction = async (req, res) => {
  const { date, amount, type, category, description } = req.body;
  if (date != null) res.transaction.date = date;
  if (amount != null) res.transaction.amount = amount;
  if (type != null) res.transaction.type = type;
  if (category != null) res.transaction.category = category;
  if (description != null) res.transaction.description = description;
  try {
    const updatedTransaction = await res.transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a transaction by ID
const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  getAllTransactions,
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
