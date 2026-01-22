const { check } = require("express-validator");

const validatorMiddleware = require("../../middleware/validatorMiddleware");

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

module.exports = {
  signinValidator,
};
