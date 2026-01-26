const { Router } = require("express");

const {
  createExpense,
  finedExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
  addUserToExpense,
} = require("../controllers/expense.controller");
// const {
//   createExpenseValidator,
//   updateExpenseValidator,
//   showExpenseValidator,
//   deleteExpenseValidator,
// } = require("../util/validators/expense.validators");
const { protect, allowedTo } = require("../controllers/auth.controller");

const router = Router();

router
  .route("/")
  .post(
    protect,
    // createExpenseValidator,
    addUserToExpense,
    createExpense,
  )
  .get(getAllExpenses);
router
  .route("/:id")
  .get(
    protect,
    // , showExpenseValidator
    finedExpense,
  )
  .put(
    protect,
    //  updateExpenseValidator,
    updateExpense,
  )
  .delete(
    protect,
    //  deleteExpenseValidator,
    deleteExpense,
  );

module.exports = router;
