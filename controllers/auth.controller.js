const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  res.status(STATUS_CODE.SUCCESS).json({
    status: STATUS.SUCCESS,
    message: `Welcome back ${user.name}`,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
});

const register = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(STATUS_CODE.CREATED).json({
    status: STATUS.SUCCESS,
    message: "User create successfully",
    user,
  });
});

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    res.status(STATUS_CODE.UNAUTHORIZED).json({
      status: STATUS.ERROR,
      message: "Unauthorized",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    res.status(STATUS_CODE.NOT_FOUND).json({
      status: STATUS.ERROR,
      message: "User not found",
    });
  } else {
    req.user = user;
    next();
  }
});

const allowedTo =
  (roles = []) =>
  (req, res, next) => {
    console.log(req.user);
    if (roles.includes(req.user.role)) {
      next();
    }
    res.status(STATUS_CODE.UNAUTHORIZED).json({
      status: STATUS.FAIL,
      message: "You are not authored to access this route",
    });
  };

module.exports = {
  signin,
  register,
  protect,
  allowedTo,
};
