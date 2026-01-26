const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    details: {
      type: String,
      required: true,
      trim: true,
      maxLength: [300, "Name cannot exceed 300 characters"],
      minLength: [2, "Name should have more than 2 characters"],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "ExpenseCategory",
      required: true,
    },
    wallet: {
      type: mongoose.Schema.ObjectId,
      ref: "Wallet",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Expense = mongoose.model("Expense", expenseSchema);
