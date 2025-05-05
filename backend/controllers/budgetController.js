import Budget from "../models/budgetModel.js";

// POST a new budget
const createBudget = async (req, res) => {
  const { category, amount, user } = req.body;
  const budget = new Budget({ category, amount, user });
  try {
    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.params.userId,
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET budgets
const getBudget = async (req, res, next) => {
  let budget;
  try {
    budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  res.budget = budget;
  next();
};

// Delete Budget
const deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { createBudget, getAllBudgets, getBudget, deleteBudget };
