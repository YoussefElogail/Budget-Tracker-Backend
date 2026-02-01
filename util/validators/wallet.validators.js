const { check } = require("express-validator");

const ApiError = require("../ApiError");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../models/user.model");
const Wallet = require("../../models/wallet.model");
const { STATUS_CODE } = require("../constants");

const createWalletValidator = [
  check("name")
    .notEmpty()
    .withMessage("wallet name is required")
    .isString()
    .withMessage("wallet name must be string")
    .isLength({ min: 2, max: 50 })
    .withMessage("wallet name must be min 2 chr and max 50 chr"),
  check("user")
    .isMongoId()
    .withMessage("user not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ _id: value });
      if (!user) {
        throw new ApiError("user is not exists", STATUS_CODE.NOT_FOUND);
      }
      if (
        user._id.toString() !== req.user.id.toString() &&
        req.user.role !== "admin"
      ) {
        throw new ApiError(
          "You can create wallet only for your account",
          STATUS_CODE.UNAUTHORIZED,
        );
      }
      return true;
    }),
  validatorMiddleware,
];

const updateWalletValidator = [
  check("id")
    .isMongoId()
    .withMessage("wallet not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const currentItem = await Wallet.findOne({ _id: req.params.id });
      if (!currentItem) {
        throw new ApiError("wallet is not exists", STATUS_CODE.NOT_FOUND);
      }
      return true;
    }),
  check("name")
    .optional()
    .isString()
    .withMessage("wallet name must be string")
    .isLength({ min: 2, max: 50 })
    .withMessage("wallet name must be min 2 chr and max 50 chr"),
  check("user")
    .optional()
    .isMongoId()
    .withMessage("user not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ _id: value });
      if (!user) {
        throw new ApiError("user is not exists", STATUS_CODE.NOT_FOUND);
      }
      if (
        user._id.toString() !== req.user.id.toString() &&
        req.user.role !== "admin"
      ) {
        throw new ApiError(
          "You can update wallet only for your account",
          STATUS_CODE.UNAUTHORIZED,
        );
      }
      return true;
    }),
  validatorMiddleware,
];

const showWalletValidator = [
  check("id")
    .isMongoId()
    .withMessage("wallet not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const item = await Wallet.findOne({ _id: value });
      if (!item) {
        throw ApiError("wallet is not exists", STATUS_CODE.NOT_FOUND);
      }
      return true;
    }),
  validatorMiddleware,
];

const deleteWalletValidator = [
  check("id")
    .isMongoId()
    .withMessage("wallet not valid mongo id")
    .bail()
    .custom(async (value, { req }) => {
      const item = await Wallet.findOne({ _id: value });
      console.log(item);
      if (!item) {
        throw ApiError("wallet is not exists", STATUS_CODE.NOT_FOUND);
      }
      if (
        item.user.toString() !== req.user.id.toString() &&
        req.user.role !== "admin"
      ) {
        throw new ApiError(
          "You can delete wallet only for your account",
          STATUS_CODE.UNAUTHORIZED,
        );
      }
      return true;
    }),
  validatorMiddleware,
];

module.exports = {
  createWalletValidator,
  updateWalletValidator,
  showWalletValidator,
  deleteWalletValidator,
};
