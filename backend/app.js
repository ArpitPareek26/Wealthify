import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

// Load environment variables early
dotenv.config({ path: "./config/config.env" });

const app = express();

// Define CORS configuration options
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://wealthify-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply the global CORS middleware
app.use(cors(corsOptions));

// Explicitly handle all OPTIONS preflight requests
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to your database
connectDB();

app.use(cookieParser());

// Set up your routes
app.use("/api/auth/users", userRoutes);
app.use("/api/auth/transactions", transactionRoutes);
app.use("/api/auth/budgets", budgetRoutes);

export default app;
