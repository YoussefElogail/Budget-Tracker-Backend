const mongoose = require("mongoose");

const incomeCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: [50, "Name cannot exceed 50 characters"],
      minLength: [2, "Name should have more than 2 characters"],
    },
  },
  {
    timestamps: true,
  },
);

const IncomeCategory = mongoose.model("IncomeCategory", incomeCategorySchema);

module.exports = IncomeCategory;
