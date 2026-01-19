// 1. Response Status Codes
const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
// 2. Response Status Strings
const STATUS = {
  SUCCESS: "success",
  FAIL: "fail",
  ERROR: "error",
};
module.exports = { STATUS_CODE, STATUS };
