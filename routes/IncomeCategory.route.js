const { Router } = require("express");

const {
  createIncomeCategory,
  getAllIncomeCategories,
  fineIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
} = require("../controllers/incomeCategory.controller");

const router = Router();

router.route("/").post(createIncomeCategory).get(getAllIncomeCategories);
router
  .route("/:id")
  .get(fineIncomeCategory)
  .put(updateIncomeCategory)
  .delete(deleteIncomeCategory);

module.exports = router;
