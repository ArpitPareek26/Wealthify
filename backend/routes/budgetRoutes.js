import express from "express";
import {
  createBudget,
  getBudget,
  deleteBudget,
  getAllBudgets,
} from "../controllers/budgetController.js";

const router = express.Router();

router.get("/all/user/:userId", getAllBudgets);
router.post("/add", createBudget);
router.get("/:id", getBudget, (req, res) => res.json(res.budget));
router.delete("/:id", getBudget, deleteBudget);

export default router;
