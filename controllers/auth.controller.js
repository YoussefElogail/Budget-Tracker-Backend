const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const { STATUS_CODE, STATUS } = require("../util/constants");
const jwtGenerator = require("../util/jwtGenerator");
const ApiError = require("../util/ApiError");

const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  const token = jwtGenerator(user._id.toString());

  res.status(200).json({
    status: "success",
    message: `Welcome back ${user.name}`,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
});
module.exports = {
  signin,
};
