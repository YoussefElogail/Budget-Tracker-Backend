const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Wallet = require("../../models/wallet.model");
const IncomeCategory = require("../../models/incomeCategory.model");
const Income = require("../../models/income.model");
const ApiError = require("../ApiError");
const { STATUS_CODE } = require("../constants");

const createIncomeValidator = [
  check("details")
    .notEmpty()
    .withMessage("Income details is required")
    .isString()
    .withMessage("Income details must be string")
    .isLength({ min: 2, max: 300 })
    .withMessage("Income details must be min 2 chr and max 300 chr"),
  check("amount")
    .notEmpty()
    .withMessage("Income amount is required")
    .isNumeric()
    .withMessage("Income amount must be number")
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
      if (val < 0) {
        throw new ApiError(
          "Income amount must be greater than 0",
          STATUS_CODE.BAD_REQUEST,
        );
      }
      return true;
    }),
  check("date").optional().isDate().withMessage("Income date must be date"),
  check("category")
    .isMongoId()
    .withMessage("Income category not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const category = await IncomeCategory.findOne({ _id: value });
      if (!category) {
        throw new ApiError(
          "Income category is not exists",
          STATUS_CODE.NOT_FOUND,
        );
      }
      return true;
    }),
  validatorMiddleware,
];

const updateIncomeValidator = [
  check("id").isMongoId().withMessage("Income not valid mongo id"),
  check("details")
    .optional()
    .isString()
    .withMessage("Income details must be string")
    .isLength({ min: 2, max: 300 })
    .withMessage("Income details must be min 2 chr and max 300 chr"),
  check("amount")
    .optional()
    .isNumeric()
    .withMessage("Income amount must be number")
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
      if (val < 0) {
        throw new ApiError(
          "Income amount must be greater than 0",
          STATUS_CODE.BAD_REQUEST,
        );
      }
      return true;
    }),
  check("date").optional().isDate().withMessage("Income date must be date"),
  check("category")
    .isMongoId()
    .withMessage("Income category not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const category = await IncomeCategory.findOne({ _id: value });
      if (!category) {
        throw new ApiError(
          "Income category is not exists",
          STATUS_CODE.NOT_FOUND,
        );
      }
      return true;
    }),
  validatorMiddleware,
];

const showIncomesValidator = [
  check("id")
    .isMongoId()
    .withMessage("Income not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const item = await Income.findOne({ _id: value });
      if (!item) {
        throw new ApiError("Income is not exists", STATUS_CODE.NOT_FOUND);
      }
      return true;
    }),
  validatorMiddleware,
];

const deleteIncomeValidator = [
  check("id")
    .isMongoId()
    .withMessage("Income not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const item = await Income.findOne({ _id: value });
      if (!item) {
        throw new ApiError("Income is not exists", STATUS_CODE.NOT_FOUND);
      }
      return true;
    }),
  validatorMiddleware,
];

module.exports = {
  createIncomeValidator,
  updateIncomeValidator,
  showIncomesValidator,
  deleteIncomeValidator,
};
