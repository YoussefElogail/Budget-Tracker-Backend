class ApiError extends Error {
  constructor(msg, statusCode, status) {
    super(msg);
    this.statusCode = statusCode;
    this.status = status;
  }
}

module.exports = ApiError;
