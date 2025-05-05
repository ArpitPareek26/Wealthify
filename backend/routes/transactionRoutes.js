import express from "express";
import {
  getAllTransactions,
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/all/user/:userId", getAllTransactions);
router.post("/add", createTransaction);
router.get("/:id", getTransaction, (req, res) => res.json(res.transaction));
router.put("/:id", getTransaction, updateTransaction);
router.delete("/:id", getTransaction, deleteTransaction);

export default router;
