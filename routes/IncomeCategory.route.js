const { Router } = require("express");

const {
  createIncomeCategory,
  getAllIncomeCategories,
  fineIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
} = require("../controllers/incomeCategory.controller");
const {
  createCategoryValidator,
  showCategoryValidator,
  UpdateCategoryValidator,
  deleteCategoryValidator,
} = require("../util/validators/category.validator");
const IncomeCategory = require("../models/incomeCategory.model");
const { protect, allowedTo } = require("../controllers/auth.controller");

const router = Router();

router
  .route("/")
  .post(
    protect,
    allowedTo("admin"),
    createCategoryValidator(IncomeCategory, "income category"),
    createIncomeCategory,
  )
  .get(getAllIncomeCategories);
router
  .route("/:id")
  .get(
    showCategoryValidator(IncomeCategory, "income category"),
    fineIncomeCategory,
  )
  .put(
    UpdateCategoryValidator(IncomeCategory, "income category"),
    updateIncomeCategory,
  )
  .delete(
    deleteCategoryValidator(IncomeCategory, "income category"),
    deleteIncomeCategory,
  );

module.exports = router;
