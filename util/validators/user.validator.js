const { check } = require("express-validator");
const ApiError = require("../ApiError");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../models/user.model");

const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("user name must be between 2 and 30 characters")
    .trim(),

  check("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .toLowerCase()
    .trim()
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("This email is already registered");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  check("phone").optional().isArray().withMessage("phone must be an array"),
  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("role must be user or admin"),

  validatorMiddleware,
];

const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),

  check("name")
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage("user name must be between 2 and 30 characters")
    .trim(),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .toLowerCase()
    .trim()
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        email: value,
        _id: { $ne: req.params.id },
      });
      if (user) {
        throw new Error("This email is already taken by another user");
      }
      return true;
    }),

  check("phone").optional().isArray().withMessage("phone must be an array"),
  check("address").optional().isArray().withMessage("address must be an array"),
  check("jobs").optional().isArray().withMessage("jobs must be an array"),

  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("role must be user or admin"),

  validatorMiddleware,
];

const showUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

const deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  showUserValidator,
  deleteUserValidator,
};
