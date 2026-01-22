const { STATUS, STATUS_CODE } = require("../util/constants");

const roleMiddleware =
  (roles = []) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    }
    res.status(STATUS_CODE.UNAUTHORIZED).json({
      status: STATUS.FAIL,
      message: "You are not authored to access this route",
    });
  };
