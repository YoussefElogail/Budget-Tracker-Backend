const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../models/user.model");
const ApiError = require("../ApiError");
const { STATUS_CODE } = require("../constants");

const signinValidator = [
  check("email")
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .toLowerCase()
    .trim(),

  check("password")
    .notEmpty()
    .withMessage("User password is required")
    .isString()
    .withMessage("Password must be a string")
    .trim(),

  validatorMiddleware,
];

const registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required")
    .isString()
    .withMessage("User name mast be String")
    .isLength({ min: 2, max: 30 })
    .withMessage("User name must be between 2 and 30 characters")
    .trim(),
  check("email")
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .toLowerCase()
    .trim()
    .bail()
    .custom(async (val, { req }) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new ApiError(
          "This email already exists",
          STATUS_CODE.BAD_REQUEST,
        );
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("User password is required")
    .isString()
    .withMessage("Password must be a string")
    .trim(),
  check("confirmPassword")
    .notEmpty()
    .withMessage("User confirmPassword is required")
    .isString()
    .withMessage("confirm Password must be a string")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(
          "Password confirmation does not match password",
          STATUS_CODE.BAD_REQUEST,
        );
      }
      return true;
    }),
  validatorMiddleware,
];

module.exports = {
  signinValidator,
  registerValidator,
};
