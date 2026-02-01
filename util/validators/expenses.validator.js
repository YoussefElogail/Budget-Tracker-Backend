const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Wallet = require("../../models/wallet.model");
const ExpenseCategory = require("../../models/expenseCategory.model");
const Expense = require("../../models/expense.model");
const ApiError = require("../ApiError");
const { STATUS_CODE } = require("../constants");

const createExpenseValidator = [
  check("details")
    .notEmpty()
    .withMessage("Expense details is required")
    .isString()
    .withMessage("Expense details must be string")
    .isLength({ min: 2, max: 300 })
    .withMessage("Expense details must be min 2 chr and max 300 chr"),
  check("amount")
    .notEmpty()
    .withMessage("Expense amount is required")
    .isNumeric()
    .withMessage("Expense amount must be number")
    .bail()
    .custom(async (val, { req }) => {
      const wallet = await Wallet.findOne({ _id: req.body.wallet });
      if (!wallet) {
        throw new ApiError("Wallet is not exists", STATUS_CODE.NOT_FOUND);
      }
      if (wallet.user._id.toString() !== req.user._id.toString()) {
        throw new ApiError(
          "this wallet is not belongs to you",
          STATUS_CODE.UNAUTHORIZED,
        );
      }
      if (val > wallet.balance) {
        throw new ApiError(
          "Expense amount is greater than wallet balance",
          STATUS_CODE.BAD_REQUEST,
        );
      }
      if (val < 0) {
        throw new ApiError(
          "Expense amount must be greater than 0",
          STATUS_CODE.BAD_REQUEST,
        );
      }
      return true;
    }),
  check("date").optional().isDate().withMessage("Expense date must be date"),
  check("category")
    .isMongoId()
    .withMessage("Expense category not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const category = await ExpenseCategory.findOne({ _id: value });
      if (!category) {
        throw new ApiError(
          "Expense category is not exists",
          STATUS_CODE.NOT_FOUND,
        );
      }
      return true;
    }),
  validatorMiddleware,
];

const updateExpenseValidator = [
  check("id").isMongoId().withMessage("Expense not valid mongo id"),
  check("details")
    .optional()
    .isString()
    .withMessage("Expense details must be string")
    .isLength({ min: 2, max: 300 })
    .withMessage("Expense details must be min 2 chr and max 300 chr"),
  check("amount")
    .optional()
    .isNumeric()
    .withMessage("Expense amount must be number")
    .bail()
    .custom(async (val, { req }) => {
      const wallet = await Wallet.findOne({ _id: req.body.wallet });
      if (!wallet) {
        throw new ApiError("Wallet is not exists", STATUS_CODE.NOT_FOUND);
      }
      if (wallet.user._id.toString() !== req.user._id.toString()) {
        throw new ApiError(
          "this wallet is not belongs to you",
          STATUS_CODE.UNAUTHORIZED,
        );
      }
      if (val > wallet.balance) {
        throw new ApiError(
          "Expense amount is greater than wallet balance",
          STATUS_CODE.BAD_REQUEST,
        );
      }
      if (val < 0) {
        throw new ApiError(
          "Expense amount must be greater than 0",
          STATUS_CODE.BAD_REQUEST,
        );
      }
      return true;
    }),
  check("date").optional().isDate().withMessage("Expense date must be date"),
  check("category")
    .isMongoId()
    .withMessage("Expense category not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const category = await ExpenseCategory.findOne({ _id: value });
      if (!category) {
        throw new ApiError(
          "Expense category is not exists",
          STATUS_CODE.NOT_FOUND,
        );
      }
      return true;
    }),
  validatorMiddleware,
];

const showExpensesValidator = [
  check("id")
    .isMongoId()
    .withMessage("Expense not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const item = await Expense.findOne({ _id: value });
      if (!item) {
        throw new ApiError("Expense is not exists", STATUS_CODE.NOT_FOUND);
      }
      return true;
    }),
  validatorMiddleware,
];

const deleteExpenseValidator = [
  check("id")
    .isMongoId()
    .withMessage("Expense not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const item = await Expense.findOne({ _id: value });
      if (!item) {
        throw new ApiError("Expense is not exists", STATUS_CODE.NOT_FOUND);
      }
      return true;
    }),
  validatorMiddleware,
];

module.exports = {
  createExpenseValidator,
  updateExpenseValidator,
  showExpensesValidator,
  deleteExpenseValidator,
};
