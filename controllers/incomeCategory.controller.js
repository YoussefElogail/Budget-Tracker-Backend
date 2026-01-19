const asyncHandler = require("express-async-handler");

const IncomeCategory = require("../models/incomeCategory.model");

// Create a new income category
const createIncomeCategory = asyncHandler(async (req, res) => {
  const category = await IncomeCategory.create(req.body);
  res.status(200).json({
    message: "income category created sucssefoly",
    data: category,
  });
});

// find all income categories
const getAllIncomeCategories = asyncHandler(async (req, res) => {
  const categories = await IncomeCategory.find();
  res.status(200).json({
    data: categories,
  });
});

//  fine one income category
const fineIncomeCategory = asyncHandler(async (req, res) => {
  const category = await IncomeCategory.findById(req.params.id);
  res.status(200).json({
    data: category,
  });
});

// update income category
const updateIncomeCategory = asyncHandler(async (req, res) => {
  const category = await IncomeCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).json({
    massage: "income category is updated sucssefoly",
    data: category,
  });
});

//  delete one income category
const deleteIncomeCategory = asyncHandler(async (req, res) => {
  await IncomeCategory.findByIdAndDelete(req.params.id);
  res.status(200).json({
    massage: "income category is deleted sucssefoly",
  });
});

module.exports = {
  createIncomeCategory,
  getAllIncomeCategories,
  fineIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
};
